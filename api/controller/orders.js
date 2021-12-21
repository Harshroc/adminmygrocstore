const { request } = require('express');
const ordersModel = require('../../models/orders');
const usersAddressModel = require('../../models/address')
const productsModel = require('../../models/products')
const { validationResult } = require('express-validator');

exports.place_order = async (req, res, next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const alert = errors.array();
        res.status(401).json(alert);
    }
    else
    {
        
        
        const address = await new usersAddressModel({
            userId: "61b63e56ae07ded15ec91aa5",
            userAddressType: req.body.userdetails.addressType,
            userAddress: req.body.userdetails.address,
            userAddressCity: req.body.userdetails.addressCity,
            userAddressPincode: req.body.userdetails.addressPincode,
        })

      let orders = [];

      for (let i = 0; i < req.body.order.cartItems.length; i++) {
        orders[i] = {
            _id : req.body.order.cartItems[i]._id,
            title : req.body.order.cartItems[i].productName,
            count : req.body.order.cartItems[i].count
        }
      };

        await address.save().then(
            result => {     

                const order = new ordersModel({
                    orderUserId: "61b63e56ae07ded15ec91aa5",
                    orderAddress : result._id,
                    orderProducts: orders,
                    orderAmount : req.body.order.total,
                    orderDeliveryTime : req.body.userdetails.deliveryTime,
                    orderPaymentMethod : req.body.userdetails.payment,
                    orderContactNumber : req.body.userdetails.phoneNo
                });        
                order.save().then(
                    results => {
                        
                        res.status(200).json({"message" : "Order Placed Sucessfully", "data": results});
                    }
                ).catch(err => {
                    res.status(500).json(err);
                })
            }
        ).catch(err => {
            res.status(500).json({"error": err});
        })

      
    
    
} 
};

