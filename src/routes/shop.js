const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:id', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);
router.post('/cart/add', shopController.postAddItemToCart);
router.post('/cart/remove', shopController.postRemoveItemFromCart);
module.exports = router;
