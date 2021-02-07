const express = require('express');

const path = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (request, response, next) => {
    response.sendFile(path('views', 'auth', 'add-product.html'));
});

router.post('/add-product', (request, response, next) => {
    products.push({'title':request.body.title});
    console.log(products);
    response.redirect('/auth/add-product');
});

module.exports = router;
