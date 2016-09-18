const http = require('http');

// Create a proxy server to brouter
const proxy = http.createServer((req, res) => {
  const options = {
    hostname: 'h2096617.stratoserver.net',
    port: 80,
    path: '/brouter?' + req.url.split('?')[1],
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  http.request(options, (r) => {
    res.setEncoding('utf8')
    body = ''
    res.on('data', (chunk) => {
      body += chunk
    });
    res.on('end', () => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.send(body)
    });
  })
});

// now that proxy is running
proxy.listen(process.env.BROUTER_PROXY_PORT, () => {
	console.log(`brouter proxy listening on port ${process.env.BROUTER_PROXY_PORT}`)
});