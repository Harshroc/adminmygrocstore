const express = require('express');
const router = express.Router();
const getCategoriesController = require('../controller/categories');

router.get('/' ,getCategoriesController.get_categories);

module.exports = router;
    