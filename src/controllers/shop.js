const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports.getProducts = (request, response, next) => {
  Product.getAll(products => {
    response.render('shop/product-list', {
      products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

module.exports.getProduct = (request, response, next) => {
  Product.findById(request.params.id, product => {
    if(product == null){
      response.redirect('/products');
      return;
    }

    response.render('shop/product-details', {
      product,
      pageTitle: `${product.title} Details`,
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
  Product.getAll(products => {
    Cart.get(cart => {
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
    });
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

module.exports.postAddItemToCart = (request, response, next) => {
  Product.findById(request.body.productId, product => {
    if(product == null) {
      response.redirect('/cart');
      return;
    }

    Cart.addProduct(product, () => response.redirect('/cart'));
  });
};

module.exports.postRemoveItemFromCart = (request, response, next) => {
  Cart.removeProductById(Number(request.body.productId), () => {
      response.redirect('/cart');
  });
};