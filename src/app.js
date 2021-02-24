const express = require('express');
const bodyParser = require('body-parser');

const path = require('./util/path');
const dataBase = require('./util/database');
const authRouter = require('./routes/auth');
const shopRouter = require('./routes/shop');
const errorRouter = require('./routes/error');
const Product = require('./models/product');
const User = require('./models/user');

const server = express();
server.set('view engine', 'pug');
server.set('views', './src/views');

server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static(path('public')));

server.use((request, response, next) =>
    User.findByPk(1)
    .then(user => request.user = user)
    .catch(error => console.log(error))
    .finally(() => next())
);
server.use('/auth', authRouter);
server.use(shopRouter);
server.use(errorRouter);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

dataBase.sync()
.then(() => User.findByPk(1))
.then(user => {
    if(user == null) 
        return User.create({name: 'Sthefano', email:'tefs@gmail.com'});
    return Promise.resolve(user);
})
.then(() => server.listen(9000))
.catch(e => console.log(e));
