const http = require('http');
const spawn = require('child_process').spawn;

const proxy = http.createServer((req, res) => {
  var body = ''
  const preq = spawn('curl', ['http://h2096617.stratoserver.net:443/brouter/?' + req.url.split('?')[1]])
  preq.stdout.setEncoding('utf8')
  preq.stdout.on('data', chunk => {
  	body += chunk
  })
  preq.stdout.on('end', () => {
  	const buff = new Buffer(body, 'utf8')
  	res.writeHead(200, {
  		'Content-Lenth': buff.length,
  		'Content-Type': 'application/json'
  	})
  	res.end(buff)
  })
});

proxy.listen(process.env.BROUTER_PROXY_PORT, () => {
  console.log(`brouter proxy listening on port ${process.env.BROUTER_PROXY_PORT}`)
});