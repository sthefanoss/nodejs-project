const mySql = require('mysql2');

const pool = mySql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'node_js',
    user:'root',
    password:'',
});

module.exports.initialize = () => {
    return pool.promise()
    .execute(String.raw`
    CREATE TABLE IF NOT EXISTS node_js.cart_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    PRIMARY KEY (id));`)
    .then(() => pool.promise()
    .execute(String.raw`
    CREATE TABLE IF NOT EXISTS node_js.products (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    price DOUBLE UNSIGNED NOT NULL,
    description VARCHAR(500) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`)
    )
};

module.exports.pool = pool.promise();