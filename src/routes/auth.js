const express = require('express');

const path = require('../util/path');

const router = express.Router();

router.get('/add-product', (request, response, next) => {
    response.sendFile(path('views', 'auth', 'add-product.html'));
});

router.post('/add-product', (request, response, next) => {
    console.log(request.body);
    response.redirect('/add-product');
});

module.exports = router;
