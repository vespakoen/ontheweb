const http = require('http');
const net = require('net');
const url = require('url');

// Create an HTTP tunneling proxy
var proxy = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var options = {
    hostname: 'h2096617.stratoserver.net',
    port: 443,
    path: '/brouter?' + req.url.split('?')[1],
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  http.request(options).pipe(res)
});

// now that proxy is running
proxy.listen(80, '127.0.0.1', () => {
	console.log('brouter proxy running on port 80')
});