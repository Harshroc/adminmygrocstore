const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');
const checkauth = require('../middleware/auth');

router.post('/signup' ,usersController.adduser);

router.post("/userlogin" ,usersController.userlogin);

router.post("/changepassword", checkauth ,usersController.userchangepassword);

module.exports = router;
