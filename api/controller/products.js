const productsModel = require('../../models/products');

exports.get_products = (req, res, next) => {
    productsModel.find().populate('productCategory','categoryName').exec().then((product) =>{
        res.status(200).json(product);

      }).catch((error) => {
        res.status(500).send(error);
      });
};