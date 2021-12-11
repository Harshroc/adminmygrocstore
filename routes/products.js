const express = require('express');
var router = express.Router();
const multer  = require('multer');
const { check, validationResult } = require('express-validator');
const categoriesModel = require('../models/categories');
const productsModel = require('../models/products');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/products");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png") {
      cb(null, true);
    } else {
      cb(new Error("Please upload jpg or png file!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });



router.post('/', [check('categoryId', 'Please Select Category')
.isEmpty(),
check('productName', 'Please Enter Product Name')
.isEmpty(),
check('productDesc', 'Please Enter Product Description')
.isEmpty(),
check('productMrp', 'Please Enter Product MRP')
.isEmpty(),
check('productRsp', 'Please Enter Product RSP')
.isEmpty(),
],upload.single('productUpload'), async (req, res, next) => {

const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const alert = errors.array();
        res.render('addproducts', { alert, urls: "addproducts" });
    }
    else
    {
        try
        {
            const products = new productsModel({
                productName : req.body.productName,
                productDesc : req.body.productDesc,
                productImage : req.file.filename,
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
    
});

router.get('/', function(req, res, next) {
    categoriesModel.find({}).select('_id categoryName').then((category) =>{
      res.render('addproducts', { urls: "addproducts", categorylist: category  });
    }).catch((error) => {
      res.status(500).send(error);
    });
    
  });

//   console.log(`${request.protocol}://${request.headers.host}`);
  
  router.get('/listproducts', (req, res, next) => {
      
    
    productsModel.find().then((product) =>{
        res.render('listproducts', { urls: "listproducts", productlist: product  });
      }).catch((error) => {
        res.status(500).send(error);
      });
  })

// router.get('/handleaddproducts', function(req, res, next) {
//   res.render('addproducts', { urls: "addproducts"  });
// });

  

module.exports = router;
