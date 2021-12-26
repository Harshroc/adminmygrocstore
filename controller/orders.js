const usersOrdersModel = require('../models/orders');

      exports.getOrders = (req, res, next) => {
        
        usersOrdersModel.find().populate('orderUserId','userEmail').populate('orderAddress','userAddressCity').exec().then((orders) =>{
            
            res.render('listorders', { urls: "listorders", orderslist: orders  });
    
          }).catch((error) => {
            res.status(500).send(error);
          });
      };

      exports.deleteOrders = (req, res, next) => {
    
      usersOrdersModel.remove({_id:{$eq:req.params.orderId}}).then(
        req.method = 'GET',
        res.redirect('/orders')
      ).catch((error) => {
        res.status(500).json({message: "Order Id not found"});
      });
    };

      exports.updateOrders = (req, res, next) => {

        let orderstatus = "";

        if(req.params.status === "pending")
        {
            orderstatus = "approve"
        }
        else if(req.params.status === "approve")
        {
            orderstatus = "pending" 
        }
        else
        {
            orderstatus = req.params.status;
        }

        usersOrdersModel.findOneAndUpdate({_id: req.params.orderId}, {$set:{orderStatus:orderstatus}}, {new: true}).exec().then((result) => 
        {
          
          req.method = 'GET',
          res.redirect('/orders')
        }
          
        ).catch((error) => {
          res.status(500).json({message: "Order Id not found"});
        });

      };

    