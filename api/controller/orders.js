const { request } = require('express');
const ordersModel = require('../models/orders');

exports.place_order = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const alert = errors.array();
        res.status(401).json(alert);
    }
    else
    {
        const order = await new ordersModel({
            orderUserId : req.body.userId,
            orderAddress : req.body.addressId,
            orderProducts: request.body.products,
            orderAmount : req.body.orderAmount,
            orderDeliveryTime : req.body.orderDeliveryTime,
            orderPaymentMethod : req.body.orderPaymentMethod,
        });
    
    await order.save().then(
        result => {
            console.log(result);
            res.status(200).json({"message" : "Order Placed Sucessfully"});
        }
    ).catch(err => {
        res.status(500).json(err);
    })
} 
};