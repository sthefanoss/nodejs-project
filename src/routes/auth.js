const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/add-product', authController.getAddProduct);
router.get('/products', authController.getProducts);
router.post('/add-product', authController.postAddProduct);

module.exports = router;
