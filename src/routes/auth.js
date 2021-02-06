const express = require('express');

const router = express.Router();

router.get('/add-product', (request, response, next) => {
    let responseHtml = String.raw`
    <form action="/add-product" method="POST">
         <input type="text" name="title">
         <button type="submit">Submit</button>
    </form>`;

    response.send(responseHtml);
});

router.post('/add-product', (request, response, next) => {
    console.log(request.body);
    response.redirect('/add-product');
});

module.exports = router;
