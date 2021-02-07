const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const shopRouter = require('./routes/shop');
const errorRouter = require('./routes/error');

const server = express();

server.use(bodyParser.urlencoded({extended: false}));
server.use(authRouter);
server.use(shopRouter);
server.use(errorRouter);

server.listen(9000);
