const express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const categoryModel = require('../controller/category');
const multer  = require('multer');

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


router.post('/handleaddcategories', [check('categoryName', 'Please Enter Username')
.isEmpty(),
check('categoryDesc', 'Please Enter Description')
.isEmpty(),
],upload.single('categoryUpload'), categoryModel.addCategory);

router.get('/', (req, res, next) => {
  res.render('addcategories', { urls: "addcategories"  });
});

router.get('/listcategories', categoryModel.listCategory);

module.exports = router;
