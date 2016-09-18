const http = require('http');
const spawn = require('child_process').spawn;

const proxy = http.createServer((req, res) => {
  var req = spawn('curl', ['http://h2096617.stratoserver.net:443/brouter/?' + req.url.split('?')[1]])
  res.writeHead(200, {'Content-Type': 'application/json'})
  req.stdout.pipe(res)
});

proxy.listen(process.env.BROUTER_PROXY_PORT, () => {
  console.log(`brouter proxy listening on port ${process.env.BROUTER_PROXY_PORT}`)
});