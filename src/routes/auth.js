const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/add-product', (request, response, next) => {
    console.log(__dirname,path.join(__dirname, '..' , 'views', 'auth', 'add-product.html'));
    response.sendFile(path.join(__dirname, '..' , 'views', 'auth', 'add-product.html'));
});

router.post('/add-product', (request, response, next) => {
    console.log(request.body);
    response.redirect('/add-product');
});

module.exports = router;
