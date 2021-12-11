const express = require('express');
var router = express.Router();
const multer  = require('multer');
const { check, validationResult } = require('express-validator');
const categoriesModel = require('../models/categories');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/categories");
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



router.post('/', [check('categoryName', 'Please Enter Username')
.isEmpty(),
check('categoryDesc', 'Please Enter Description')
.isEmpty(),
],upload.single('categoryUpload'), async (req, res, next) => {

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
    
});

router.get('/', function(req, res, next) {
  res.render('addcategories', { urls: "addcategories"  });
});

router.get('/listcategories', function(req, res, next) {
  categoriesModel.find().then((category) =>{
    res.render('listcategories', { urls: "listcategories", categorylist: category  });
  }).catch((error) => {
    res.status(500).send(error);
  });
  
});

  

module.exports = router;
