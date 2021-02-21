const express = require('express');
const bodyParser = require('body-parser');

const path = require('./util/path');
const dataBase = require('./util/database');

const authRouter = require('./routes/auth');
const shopRouter = require('./routes/shop');
const errorRouter = require('./routes/error');

const server = express();
server.set('view engine', 'pug');
server.set('views', './src/views');

server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static(path('public')));

server.use('/auth', authRouter);
server.use(shopRouter);
server.use(errorRouter);

dataBase.initialize().then(() => server.listen(9000));

