const express = require('express');
var router = express.Router();

const orderController = require('../controller/orders');

router.get('/', orderController.getOrders);

router.get('/listorders', orderController.getOrders);

router.get('/deleteorders/:orderId', orderController.deleteOrders);

router.get('/updateorders/:orderId/:status', orderController.updateOrders);

module.exports = router;
