const Product = require('../models/product');

module.exports.getAddProduct = (request, response, next) => {
    response.render('auth/edit-product', { 
        pageTitle: 'Add Product',
        path: '/auth/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

module.exports.getEditProduct = (request, response, next) => {
    Product.findById(request.params.productId).then(product => {
        if(product == null) {
            response.redirect('/auth/add-product');
            return;
        }

        response.render('auth/edit-product', {
            pageTitle: 'Edit Product',
            path: '/auth/products',
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
            product,
        });
    });
};

module.exports.postAddProduct = (request, response, next) => {
    let title = request.body.title;
    let imageUrl = request.body.imageUrl;
    let price = request.body.price;
    let description = request.body.description;
    let product = new Product(title, imageUrl, description, price);

    product.save().then(() => response.redirect('/auth/products'))
    .catch(e => console.log(e));
};

module.exports.getProducts = (request, response, next) => {
    Product.getAll().then(products => {
        response.render('auth/products', {
            products,
            pageTitle: 'Your Products',
            path: '/auth/products' 
        });
    })
    .catch(e => console.log(e));
};

module.exports.postEditProduct = (request, response, next) => {
    let title = request.body.title;
    let imageUrl = request.body.imageUrl;
    let price = request.body.price;
    let description = request.body.description;
    let product = new Product(title, imageUrl, description, price, request.params.productId);

    product.edit().then(() => 
        response.redirect('/auth/products')
    )
    .catch(e => console.log(e));
};

module.exports.postDeleteProduct = (request, response, next) => {
    Product.deleteById(request.params.productId).then(() => 
        response.redirect('/auth/products')
    )
    .catch(e => console.log(e));
};


  