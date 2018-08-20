const http = require('http')
const url = require('url')
const debug = require('debug')
const qs = require('querystring')
const WebSocketServer = require('uws').Server
const {
  handleUpload,
  handleDownload,
  handleCreateHumm,
  handleGetHumm,
  handleGetUserByFacebookId,
  handleCreateFacebookUser,
  handleGetUserByDeviceId,
  handleCreateGuestUser,
  handleGetNextHumm,
  handleGetCurrentHumm,
  handleCommentOnHumm,
  handleGetRequests
} = require('./src/handlers')

const wsConnections = {}

const log = debug('api:index')
const PORT = process.env.SERVER_PORT || 8080

function corsify(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
}

function handleRequest(req, res) { // eslint-disable-line consistent-return
  // cors
  corsify(res)
  if (req.method === 'OPTIONS') {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': false,
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    }
    res.writeHead(200, headers);
    res.end();
  }
  // get pathname
  const pathname = url.parse(req.url).pathname
  log('handleRequest', pathname)
  // routes
  if (pathname === '/upload') {
    // POST /upload
    return handleUpload(req, res)
  } else if (pathname.startsWith('/humm')) {
    // GET /humm/:uuid
    req.params = { // eslint-disable-line no-param-reassign
      filename: pathname.split('/')[2]
    }
    return handleDownload(req, res)
  } else if (pathname === '/api/humms') {
    // POST /api/humms
    return handleCreateHumm(req, res)
  } else if (pathname.startsWith('/api/humms/') && pathname.endsWith('comments')) {
    // POST /api/humms/:id/comments
    req.params = { // eslint-disable-line no-param-reassign
      hummId: pathname.split('/')[3]
    }
    return handleCommentOnHumm(req, res, wsConnections)
  // } else if (pathname.startsWith('/api/humms/') && pathname.endsWith('comments/')) {
  } else if (pathname.startsWith('/api/humms/')) {
    // GET /api/humms/:id
    req.params = { // eslint-disable-line no-param-reassign
      id: pathname.split('/')[3]
    }
    return handleGetHumm(req, res)
  } else if (pathname.startsWith('/api/users/') && pathname.endsWith('/nexthumm')) {
    // GET /api/nexthumm/:userId
    req.params = { // eslint-disable-line no-param-reassign
      userId: pathname.split('/')[3]
    }
    return handleGetNextHumm(req, res)
  } else if (pathname.startsWith('/api/users/') && pathname.endsWith('/currenthumm')) {
    // GET /api/currenthumm/:userId
    req.params = { // eslint-disable-line no-param-reassign
      userId: pathname.split('/')[3]
    }
    return handleGetCurrentHumm(req, res)
  } else if (pathname.startsWith('/api/users/') && pathname.endsWith('/requests')) {
    // GET /api/users/:userId/requests
    req.params = { // eslint-disable-line no-param-reassign
      userId: pathname.split('/')[3]
    }
    return handleGetRequests(req, res)
  } else if (pathname.startsWith('/api/users/facebook/')) {
    req.params = { // eslint-disable-line no-param-reassign
      facebookId: pathname.split('/')[4]
    }
    return handleGetUserByFacebookId(req, res)
  } else if (pathname === '/api/users/facebook') {
    return handleCreateFacebookUser(req, res)
  } else if (pathname.startsWith('/api/users/guest/')) {
    req.params = { // eslint-disable-line no-param-reassign
      deviceId: pathname.split('/')[4]
    }
    return handleGetUserByDeviceId(req, res)
  } else if (pathname === '/api/users/guest') {
    return handleCreateGuestUser(req, res)
  }
  res.writeHead(404)
  res.end('Not found')
}

const server = http.createServer(handleRequest)
server.listen(PORT, '0.0.0.0', () => {
  log('Server listening on: http://0.0.0.0:%s', PORT)
})

const wss = new WebSocketServer({ port: 8090 })

wss.on('connection', (ws, conn) => {
  const parsed = url.parse(conn.url)
  const data = qs.parse(parsed.query)
  wsConnections[data.userId] = ws
})