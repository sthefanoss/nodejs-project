const products = [];

module.exports.getAddProduct = (request, response, next) => {
    response.render('add-product', { pageTitle: 'Add Product', path: '/auth/add-product' });
};

module.exports.postAddProduct = (request, response, next) => {
    products.push({'title':request.body.title});
    console.log(products);
    response.redirect('/auth/add-product');
};

module.exports.getProducts = (request, response, next) => {
    response.render('shop', { products, pageTitle: 'Shop', path: '/' });
};
