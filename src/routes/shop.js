const express = require('express');

const path = require('../util/path');

const router = express.Router();

router.get('/', (request, response, next) => {
    response.sendFile(path('views', 'shop', 'shop.html'));
});

module.exports = router;
