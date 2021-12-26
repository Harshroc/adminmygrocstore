const express = require('express');
var router = express.Router();

const userController = require('../controller/users');

router.get('/', userController.getUsers);

router.get('/deleteusers/:id', userController.deleteUsers);

module.exports = router;
