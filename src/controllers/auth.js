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
    Product.findByPk(request.params.id).then(product => {
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

module.exports.getProducts = (request, response, next) => {
    Product.findAll().then(products => {
        response.render('auth/products', {
            products,
            pageTitle: 'Your Products',
            path: '/auth/products' 
        });
    })
    .catch(e => console.log(e));
};

module.exports.postAddProduct = (request, response, next) => {
    let title = request.body.title;
    let imageUrl = request.body.imageUrl;
    let price = request.body.price;
    let description = request.body.description;

    Product.create({title, imageUrl, price, description})
    .catch(e => console.log(e))
    .finally(() => response.redirect('/auth/products'));
};

module.exports.postEditProduct = (request, response, next) => {
    Product.findByPk(request.params.id).then(product => {
        if(product == null)
            return;
           
        product.title = request.body.title;
        product.imageUrl = request.body.imageUrl;
        product.price = request.body.price;
        product.description = request.body.description;
        return product.save();
    })
    .then()
    .catch(e => console.log(e))
    .finally(() => response.redirect('/auth/products'));
};

module.exports.postDeleteProduct = (request, response, next) => {
    Product.destroy({where:{id: request.params.id}})
    .catch(e => console.log(e))
    .finally(() => response.redirect('/auth/products'));
};
