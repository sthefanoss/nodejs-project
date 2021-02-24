const Sequelize = require('sequelize');

const dataBase = new Sequelize('node_js', 'root', '', {
    dialect: 'mysql',
    host:'localhost'
});

module.exports = dataBase;