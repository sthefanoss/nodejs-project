const dataBase = require('../util/database');

module.exports = class Product{
    constructor(title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = id;
    }

    static fromDatabase(data) {
        return new Product(
            data.title,
            data.image_url,
            data.description,
            data.price,
            data.id
        );
    }

    static getAll() {
        return dataBase.pool.execute(
            'SELECT * FROM products',
        ).then(([products, rows]) => products.map(Product.fromDatabase));
    }

    static findById(id) {
        return dataBase.pool.execute(
            'SELECT * FROM products where products.id=?',
            [id],
        ).then(([products, rows]) => Product.fromDatabase(products[0]))
        .catch(() => null);
    }

    static deleteById(id) {
        return dataBase.pool.execute(
            'DELETE FROM products where products.id=?',
            [id],
        );
    }

    save() {
        return dataBase.pool.execute(
            'INSERT INTO products (title, price, image_url, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description],
        );
    }

    edit() {
        return dataBase.pool.execute(
            'UPDATE products SET title=?, price=?, image_url=?, description=? WHERE id=?',
            [this.title, this.price, this.imageUrl, this.description, this.id],
        );
    }
};