const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const shopRouter = require('./routes/shop');

const server = express();

server.use(bodyParser.urlencoded({extended: false}));
server.use(authRouter);
server.use(shopRouter);

server.listen(9000);
