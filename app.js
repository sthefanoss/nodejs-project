const express = require('express');
const router = require('./router');

const server = express();

server.use(router);

server.listen(9000);
