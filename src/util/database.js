const mySql = require('mysql2');

const pool = mySql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'node-js',
    user:'root',
    password:'',
});

module.exports = pool.promise();