const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports.getProducts = (request, response, next) => {
  Product.getAll().then(products => {
    response.render('shop/product-list', {
      products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(e => console.log(e));
};

module.exports.getProduct = (request, response, next) => {
  Product.findById(request.params.id).then(product => {
    if(product == null){
      response.redirect('/products');
      return;
    }

    response.render('shop/product-details', {
      product,
      pageTitle: `${product.title} Details`,
      path: '/products'
    });
  })
  .catch(e => console.log(e));;
};

module.exports.getIndex = (request, response, next) => {
  Product.getAll().then(products => {
    response.render('shop/index', {
      products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(e => console.log(e));
};

module.exports.getCart = (request, response, next) => {
  Product.getAll().then(products => 
    Cart.get().then(cart => {
      let totalCount = 0;
      let productsInCart = products
        .filter(product => cart.has(product.id))
        .map(product => {
          product.quantity = cart.get(product.id);
          product.total =  product.price * product.quantity;
          totalCount += product.total;
          return product;
        });

        response.render('shop/cart', {
          totalCount,
          productsInCart,
          path: '/cart',
          pageTitle: 'Your Cart'
        });
    })
  );
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

module.exports.postAddItemToCart = (request, response, next) => {
  Cart.addProduct(request.body.productId).then(() => response.redirect('/cart'));
};

module.exports.postRemoveItemFromCart = (request, response, next) => {
  Cart.subProduct(request.body.productId).then(() => response.redirect('/cart'));
};