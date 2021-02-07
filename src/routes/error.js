const express = require('express');

const router = express.Router();

router.use((request, response, next) => {
    response.status(404).render('error/404');
});

module.exports = router;
