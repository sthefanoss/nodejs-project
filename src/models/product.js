module.exports = class Product{
    static products = [];

    static getAll() {
        return this.products;
    }

    constructor(title){
        this.title = title;
    }

    save() {
        Product.products.push(this);
    }
};