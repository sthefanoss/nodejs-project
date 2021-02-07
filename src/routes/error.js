const express = require('express');

const path = require('../util/path');

const router = express.Router();

router.use((request, response, next) => {
    response.status(404).sendFile(path('views', 'error', '404.html'));
});

module.exports = router;
