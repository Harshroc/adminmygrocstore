const express = require('express');
const router = express.Router();
const ordersController = require('../controller/orders');
const checkauth = require('../middleware/auth');


router.post('/' ,checkauth, ordersController.place_order);

router.get('/getorders/:userid' ,checkauth, ordersController.get_orders);

module.exports = router;    
    