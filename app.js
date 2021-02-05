const http = require('http');
const fileSystem = require('fs');

const server = http.createServer((request, response) => {
    if(request.url === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('    <head><title>Enter message</title></head>');
        response.write('    <body><form action="/message" method="POST">');
        response.write('        <input type="text" name="message">');
        response.write('        <button type="submit">Send</button>');
        response.write('    </from></body>');
        response.write('</html>');
        response.end();
        return 
    }
    
    if(request.url === '/message' && request.method ==='POST') {
        fileSystem.writeFileSync('message', 'DUMMY');
        response.statusCode = 302;
        response.setHeader('Location', '/');
        response.end();
        return;
    }

    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('    <head><title>Hello world!</title></head>');
    response.write('    <body><h1>Hello from my first Node.js server.</h1></body>');
    response.write('</html>');
    response.end();
});

server.listen(9000);
