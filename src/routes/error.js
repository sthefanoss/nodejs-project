const express = require('express');

const router = express.Router();

router.use((request, response, next) => {
    response.status(404).render('404', { pageTitle: 'Page not Found' });
});

module.exports = router;
