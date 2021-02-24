const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/add-product', authController.getAddProduct);
router.get('/edit-product/:id', authController.getEditProduct);
router.get('/products', authController.getProducts);
router.post('/add-product', authController.postAddProduct);
router.post('/edit-product/:id', authController.postEditProduct);
router.post('/delete-product/:id', authController.postDeleteProduct);

module.exports = router;
