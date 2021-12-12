const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');

router.post('/signup' ,usersController.adduser);

router.post("/userlogin" ,usersController.userlogin);

module.exports = router;
