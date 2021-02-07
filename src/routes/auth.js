const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (request, response, next) => {
    response.render('auth/add-product');
});

router.post('/add-product', (request, response, next) => {
    products.push({'title':request.body.title});
    console.log(products);
    response.redirect('/auth/add-product');
});

module.exports.router = router;
module.exports.products = products;
