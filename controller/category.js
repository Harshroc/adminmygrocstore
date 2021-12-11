
const categoriesModel = require('../models/categories');
const { validationResult } = require('express-validator');


exports.addCategory =  async (req, res, next) => {

    const errors = validationResult(req);
    
        if(!errors.isEmpty()) {
            const alert = errors.array();
            res.render('addcategories', { alert, urls: "addcategories" });
        }
        else
        {
            try
            {
                const categories = new categoriesModel({
                    categoryName : req.body.categoryName,
                    categoryDesc : req.body.categoryDesc,
                    categoryImage : req.file.filename,
                });
        
                categories.save((err, response) => {
                    // if(err) throw err;
                    res.render('addcategories', { err, urls: "addcategories" });
                  });
            }
            catch(ex)
            {
                return next(ex);
            }   
        }
    };

    exports.listCategory = (req, res, next) => {
        categoriesModel.find().then((category) =>{
          res.render('listcategories', { urls: "listcategories", categorylist: category  });
        }).catch((error) => {
          res.status(500).send(error);
        });
        
      };