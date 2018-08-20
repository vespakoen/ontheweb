const debug = require('debug')
const concat = require('concat-stream')

const log = debug('api:utils')

function parseJsonRequest(req) {
  return new Promise((resolve) => {
    req.setEncoding('utf8')
    req.pipe(concat((body => {
      const json = JSON.parse(body)
      resolve(json)
    })))
  })
  .catch(err => {
    log('error while parsing JSON: %s', err.message)
    throw new Error('Unable to parse JSON')
  })
}

function endJson(res, json, status = 200) {
  log('sending response', status, JSON.stringify(json, undefined, 2))
  res.setHeader('content-type', 'application/json')
  res.writeHead(status)
  res.end(JSON.stringify(json))
}

module.exports = {
  parseJsonRequest,
  endJson
}
