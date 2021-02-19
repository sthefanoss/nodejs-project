const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/add-product', authController.getAddProduct);
router.get('/edit-product/:productId', authController.getEditProduct);
router.get('/products', authController.getProducts);
router.post('/add-product', authController.postAddProduct);
router.post('/edit-product/:productId', authController.postEditProduct);
router.post('/delete-product/:productId', authController.postDeleteProduct);

module.exports = router;
