const Sequelize = require('sequelize');

const dataBase = require('../util/database');

const Product = dataBase.define('product', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Product;
