const path = require('path');
const express = require('express');

const router = express.Router();

router.use((request, response, next) => {
    response.status(404).sendFile(path.join(__dirname, '..', 'views', 'error', '404.html'));
});

module.exports = router;
