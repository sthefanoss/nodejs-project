const Sequelize = require('sequelize');

const dataBase = require('../util/database');

module.exports = dataBase.define('cart_item', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    productId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
