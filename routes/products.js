const express = require('express');
var router = express.Router();
const multer  = require('multer');
const { check } = require('express-validator');

const productController = require('../controller/product');

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
    limits : {fileSize: 1024 * 1024 * 5 },
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
],upload.single('productUpload'), productController.addProductAction);

router.get('/', productController.addProduct);

router.get('/listproducts', productController.getProduct);

module.exports = router;
