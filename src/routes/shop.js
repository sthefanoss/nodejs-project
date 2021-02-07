const express = require('express');

const authData = require('./auth');

const router = express.Router();

router.get('/', (request, response, next) => {
    let products = authData.products;
    response.render('shop', { products, pageTitle: 'Shop', path: '/' });
});

module.exports = router;
