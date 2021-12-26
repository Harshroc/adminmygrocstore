var express = require('express');
var router = express.Router();
const loginController = require('../controller/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { urls: ""  });
});

router.post('/handlelogin', loginController.adminUserLogin);

module.exports = router;
