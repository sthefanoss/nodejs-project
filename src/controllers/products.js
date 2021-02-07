const Product = require('../models/product');

module.exports.getAddProduct = (request, response, next) => {
    response.render('add-product', { pageTitle: 'Add Product', path: '/auth/add-product' });
};

module.exports.postAddProduct = (request, response, next) => {
    let newProduct = new Product(request.body.title);
    newProduct.save();

    response.redirect('/auth/add-product');
};

module.exports.getProducts = (request, response, next) => {
    response.render('shop', { products: Product.getAll(), pageTitle: 'Shop', path: '/' });
};
