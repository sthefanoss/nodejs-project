const express = require('express');

const server = express();

server.use('/', (request, response, next) => {
    console.log('This always runs!');
    next();
});

server.use('/add-product', (request, response, next) => {
    let responseHtml = String.raw`
    <form action="/add-product" method="POST">
         <input type="text" name="title">
         <button type="submit">Submit</button>
    </form>`;

    response.send(responseHtml);
});

server.use('/', (request, response, next) => {
    response.send('<h1>Hello from express</h1>');
});

server.listen(9000);
