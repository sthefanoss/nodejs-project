const dataBase = require('../util/database');

module.exports = class Product{
    constructor(title, imageUrl, description, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = id;
    }

    static getAll() {
        return dataBase.execute(
            'SELECT * FROM products',
        ).then(([products, rows]) => products);
    }

    static findById(id) {
        return dataBase.execute(
            'SELECT * FROM products where products.id=?',
            [id],
        ).then(([products, rows]) => products[0])
        .catch(() => null);
    }

    static deleteById(id) {
        return dataBase.execute(
            'DELETE FROM products where products.id=?',
            [id],
        );
    }

    save() {
        return dataBase.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description],
        );
    }

    edit() {
        return dataBase.execute(
            'UPDATE products SET title=?, price=?, imageUrl=?, description=? WHERE id=?',
            [this.title, this.price, this.imageUrl, this.description, this.id],
        );
    }
};