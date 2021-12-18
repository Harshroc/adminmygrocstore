const express = require('express');
const router = express.Router();
const getProductsController = require('../controller/products');

router.get('/' ,getProductsController.get_products);

router.get('/product/:id' ,getProductsController.get_product);

module.exports = router;
    