const http = require('http');

// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  const options = {
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
proxy.listen(8080, '127.0.0.1', () => {
	console.log('brouter proxy listening on port 8080')
});