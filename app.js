const express = require('express');

const server = express();

server.use('/', (request, response, next) => {
    console.log('This always runs!');
    next();
});

server.use('/add-product', (request, response, next) => {
    response.send('<h1>The add product page</h1>');
});

server.use('/', (request, response, next) => {
    response.send('<h1>Hello from express</h1>');
});

server.listen(9000);
