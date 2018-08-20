const fs = require('fs')
const spawn = require('child_process').spawn
const Busboy = require('busboy')
const debug = require('debug')
const { parseJsonRequest, endJson } = require('./utils')
const { Op } = require('sequelize')

const log = debug('api:humms')
const {
  FacebookProfile,
  GuestProfile,
  User,
  Humm,
  Comment,
} = require('./db')

function createConvertStream(format, inputStream) {
  const converter = spawn('ffmpeg', ['-i', 'pipe:0', '-f', format, 'pipe:1'])
  converter.stderr.on('data', error => {
    log('Error while decoding audio: %s', error.toString())
  })
  inputStream.pipe(converter.stdin)
  return converter.stdout
}

function handleUpload(req, res) {
  const busboy = new Busboy({ headers: req.headers })
  const id = '' + Date.now()
  const audioPath = `/data/${id}`
  const mp3File = `${audioPath}.mp3`
  const wavFile = `${audioPath}.wav`
  busboy.on('file', (fieldname, file/* , filename, encoding, mimetype*/) => {
    const toMp3 = createConvertStream('mp3', file)
    const toWav = createConvertStream('wav', file)
    let mp3Finished = false
    let wavFinished = false
    toWav
      .on('end', () => {
        wavFinished = true
        if (mp3Finished) res.end('' + id) // eslint-disable-line prefer-template
      })
      .pipe(fs.createWriteStream(wavFile))
    toMp3
      .on('end', () => {
        mp3Finished = true
        if (wavFinished) res.end('' + id) // eslint-disable-line prefer-template
      })
      .pipe(fs.createWriteStream(mp3File))
  })
  req.pipe(busboy)
}

function handleDownload(req, res) {
  const safeFilename = req.params.filename.replace(/\.\.\//g, '')
  const filePath = `/data/${safeFilename}`
  if (!fs.existsSync(filePath)) {
    return endJson(res, { error: 'Unknown recording...' }, 400)
  }
  return fs.createReadStream(filePath)
    .pipe(res)
}

function handleCreateHumm(req, res) {
  parseJsonRequest(req)
    .then(humm => Humm.create(humm))
    .then(() => endJson(res, { success: true }))
    .catch(err => {
      endJson(res, {
        error: err.message
      }, 400)
    })
}

function handleCommentOnHumm(req, res, wsConnections) {
  parseJsonRequest(req)
    .then(comment => Comment.create({
      hummId: req.params.hummId,
      ...comment
    }))
    .then((comment) => {
      return Humm.find({
        where: {
          id: req.params.hummId
        },
        include: [{
          model: User,
          as: 'user',
          include: [{
            model: GuestProfile,
            as: 'guestProfile'
          }, {
            model: FacebookProfile,
            as: 'facebookProfile'
          }]
        }]
      })
      .then((humm) => {
        if (wsConnections[humm.user.id]) {
          wsConnections[humm.user.id].send(JSON.stringify({
            type: 'NOTIFICATION',
            payload: {
              type: 'NEW_COMMENT_ON_HUMM',
              humm,
              comment
            }
          }))
        }
      })
      .then(() => endJson(res, { success: true }))
      .catch(err => {
        endJson(res, {
          error: err.message
        }, 400)
      })
    })
}

function handleGetHumm(req, res) {
  Humm.findById(req.params.id)
    .then(humm => endJson(res, humm.toJSON()))
    .catch(err => {
      log('error', err)
      endJson(res, { error: err.message }, 400)
    })
}

function handleCreateGuestUser(req, res) {
  parseJsonRequest(req)
    .then(guestProfile => {
      log('handleCreateGuestUser', guestProfile)
      const newUser = {
        lastHummDate: null
      }
      return User.create(newUser)
        .then((user) => {
          const newGuestProfile = {
            ...guestProfile,
            userId: user.id
          }
          return GuestProfile.create(newGuestProfile)
            .then(() => endJson(res, {
              ...user.toJSON(),
              guestProfile: newGuestProfile
            }))
            .catch(err => {
              log('error', err)
              endJson(res, { error: err.message }, 400)
            })
        })
    })
}

function handleCreateFacebookUser(req, res) {
  parseJsonRequest(req)
    .then(facebookProfile => {
      log('handleCreateFacebookUser', facebookProfile)
      const newUser = {
        lastHummDate: null
      }
      return User.create(newUser)
        .then((user) => {
          const newFacebookProfile = {
            id: facebookProfile.id,
            email: facebookProfile.email,
            name: facebookProfile.name,
            firstName: facebookProfile.first_name,
            userId: user.id
          }
          return FacebookProfile.create(newFacebookProfile)
            .then(() => endJson(res, {
              ...user.toJSON(),
              facebookProfile: newFacebookProfile
            }))
            .catch(err => {
              log('error', err)
              endJson(res, { error: err.message }, 400)
            })
        })
    })
}

function handleGetUserByDeviceId(req, res) {
  log('handleGetUserByDeviceId', req.params.deviceId)
  GuestProfile.find({
    where: {
      deviceId: req.params.deviceId
    }
  })
  .then(guestProfile => {
    if (!guestProfile) {
      throw new Error('Profile not found')
    }
    return User.findById(guestProfile.userId)
      .then(user => endJson(res, {
        ...user.toJSON(),
        guestProfile
      }))
  })
  .catch(err => {
    log('error', err)
    endJson(res, { error: err.message }, 400)
  })
}

function handleGetUserByFacebookId(req, res) {
  log('handleGetUserByFacebookId', req.params.facebookId)
  FacebookProfile.findById(req.params.facebookId)
    .then(facebookProfile => {
      if (!facebookProfile) {
        throw new Error('Profile not found')
      }
      return User.findById(facebookProfile.userId)
        .then(user => endJson(res, {
          ...user.toJSON(),
          facebookProfile
        }))
    })
    .catch(err => {
      log('error', err)
      endJson(res, { error: err.message }, 400)
    })
}

function handleGetCurrentHumm(req, res) {
  const userId = req.params.userId
  log('handleGetCurrentHumm', userId)
  User.findById(userId)
    .then(user => {
      return Humm.find({
        where: user.lastHummDate ? {
          createdAt: {
            [Op.gt]: user.lastHummDate
          }
        } : {},
        order: ['createdAt']
      })
    })
    .then(humm => {
      if (!humm) {
        return endJson(res, { error: 'No humms found' }, 400)
      }
      return endJson(res, humm.toJSON())
    })
    .catch(err => {
      log('error', err)
      endJson(res, { error: err.message }, 400)
    })
}

function handleGetNextHumm(req, res) {
  const userId = req.params.userId
  log('handleGetNextHumm', userId)
  User.findById(userId)
    .then(user => {
      return Humm.find({
        where: user.lastHummDate ? {
          createdAt: {
            [Op.gt]: user.lastHummDate
          }
        } : {},
        order: ['createdAt']
      })
      .then(humm => {
        if (!humm) {
          return endJson(res, { error: 'No humms found' }, 400)
        }
        user.lastHummDate = humm.createdAt
        return user.save()
          .then(() => endJson(res, humm.toJSON()))
      })
    })
    .catch(err => {
      log('error', err)
      endJson(res, { error: err.message }, 400)
    })
}

function handleGetRequests(req, res) {
  const userId = req.params.userId
  log('handleGetRequests', userId)
  Humm.findAll({
    where: {
      userId
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [{
      model: Comment,
      as: 'comments',
      include: [{
        model: User,
        as: 'user',
        include: [{
          model: GuestProfile,
          as: 'guestProfile'
        }, {
          model: FacebookProfile,
          as: 'facebookProfile'
        }]
      }]
    }]
  })
  .then(humms => {
    endJson(res, humms.map(humm => humm.toJSON()), 200)
  })
  .catch(err => {
    log('error', err)
    endJson(res, { error: err.message }, 400)
  })
}

module.exports = {
  handleGetUserByFacebookId,
  handleCreateFacebookUser,
  handleGetUserByDeviceId,
  handleCreateGuestUser,
  handleGetNextHumm,
  handleGetCurrentHumm,
  handleGetRequests,
  handleUpload,
  handleDownload,
  handleCreateHumm,
  handleGetHumm,
  handleCommentOnHumm
}