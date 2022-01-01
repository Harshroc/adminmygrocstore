const productsModel = require('../../models/products');

exports.get_products = (req, res, next) => {
    productsModel.find().populate('productCategory','categoryName').exec().then((product) =>{
        res.status(200).json(product);

      }).catch((error) => {
        res.status(500).send(error);
      });
};

exports.get_product = (req, res, next) => {
  const prod = req.params.id;
  productsModel.find({'_id': prod}).populate('productCategory','categoryName').exec().then((product) =>{
      res.status(200).json({product, message: "Success"});
    }).catch((error) => {
      res.status(500).json({error: error});
    });
};


