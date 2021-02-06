const express = require('express');

const server = express();

server.use((request, response, next) => {
    console.log('In the middleware!', request.url);
    next();
});

server.use((request, response, next) => {
    console.log('In another middleware', request.url);
    response.send('<h1>Hello from express</h1>');
});

server.listen(9000);
