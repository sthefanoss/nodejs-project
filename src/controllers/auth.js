const Product = require('../models/product');

module.exports.getAddProduct = (request, response, next) => {
    response.render('auth/add-product', { 
        pageTitle: 'Add Product',
        path: '/auth/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

module.exports.postAddProduct = (request, response, next) => {
    let title = request.body.title;
    let imageUrl = request.body.imageUrl;
    let price = request.body.price;
    let description = request.body.description;
    let product = new Product(title, imageUrl, description, price);

    product.save(() => response.redirect('/auth/products'));
};

module.exports.getProducts = (request, response, next) => {
    Product.getAll((products) => {
        response.render('auth/products', {
            products,
            pageTitle: 'Your Products',
            path: '/auth/products' 
        });
    });
};
  