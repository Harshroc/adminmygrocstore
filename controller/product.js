const categoriesModel = require('../models/categories');
const productsModel = require('../models/products');
const base_url = require('./../util/utilconf');
const { validationResult } = require('express-validator');

exports.addProductAction = async (req, res, next) => {

    const errors = validationResult(req);
    
        if(!errors.isEmpty()) {
            const alert = errors.array();
            res.render('addproducts', { alert, urls: "addproducts" });
        }
        else
        {
            try
            {
                const filepath = base_url+req.file.path.split('/').slice(1).join('/');
                const products = new productsModel({
                    productName : req.body.productName,
                    productDesc : req.body.productDesc,
                    productImage : filepath,
                    productMrp : req.body.productMrp,
                    productRsp : req.body.productRsp,
                    productCategory : req.body.categoryId,
                });
        
                products.save((err, response) => {
                    
                    categoriesModel.find({}).select('_id categoryName').then((category) =>{
                        res.render('addproducts', { urls: "addproducts", categorylist: category,  });
                      })                
                  });
            }
            catch(ex)
            {
                return next(ex);
            }
            
        }
        
    };

    exports.addProduct = (req, res, next) => {
        categoriesModel.find({}).select('_id categoryName').then((category) =>{
          res.render('addproducts', { urls: "addproducts", categorylist: category  });
        }).catch((error) => {
          res.status(500).send(error);
        });
        
      };

      exports.getProduct = (req, res, next) => {
      
        productsModel.find().populate('productCategory','categoryName').exec().then((product) =>{
            
            res.render('listproducts', { urls: "listproducts", productlist: product  });
    
          }).catch((error) => {
            res.status(500).send(error);
          });
      };

      exports.delete_product = (req, res, next) => {

        productsModel.remove({_id:{$eq:req.params.id}}).then(
          req.method = 'GET',
          res.redirect('/products/listproducts')
        ).catch((error) => {
            res.status(500).send(error);
          });
      };

    