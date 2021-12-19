const express = require('express');
const router = express.Router();
const ordersController = require('../controller/orders');
const { validationResult } = require('express-validator');

router.post('/' ,ordersController.place_order);

module.exports = router;
    