const http = require('http');

const server = http.createServer((request, response) => {
    console.log(request);

    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>Hello world!</title></head>');
    response.write('<body><h1>Hello from my first Node.js server.</h1></body>');
    response.write('</html>');

    response.end();
});

server.listen(9000);
