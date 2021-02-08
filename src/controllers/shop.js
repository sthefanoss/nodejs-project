const Product = require('../models/product');

module.exports.getProducts = (request, response, next) => {
  Product.getAll(products => {
    response.render('shop/product-list', {
      products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

module.exports.getIndex = (request, response, next) => {
  Product.getAll(products => {
    console.log(products);
    response.render('shop/index', {
      products: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

module.exports.getCart = (request, response, next) => {
  response.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

module.exports.getOrders = (request, response, next) => {
  response.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

module.exports.getCheckout = (request, response, next) => {
  response.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
