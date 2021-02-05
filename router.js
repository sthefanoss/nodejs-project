const fileSystem = require('fs');

module.exports = (request, response) => {
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
        let body = [];
        request.on('data', dataChunk => body.push(dataChunk));
        request.on('end', () => {
            let parsedBody = Buffer.concat(body).toString();
            let message = parsedBody.split('=')[1];
            fileSystem.writeFile('message.txt', message, exceptionResponse => {
                console.log(exceptionResponse);
                response.statusCode = 302;
                response.setHeader('Location', '/');
                response.end();
            });
        });
        return;
    }

    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('    <head><title>Hello world!</title></head>');
    response.write('    <body><h1>Hello from my first Node.js server.</h1></body>');
    response.write('</html>');
    response.end();
};
