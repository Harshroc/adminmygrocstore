const adminUsersModel = require('../models/adminusers');
const usersModel = require('../models/users');

const bcrypt = require('bcrypt');

exports.adminUserLogin = (req, res, next) => {

if(!req.body.adminemail || !req.body.adminpassword){
    res.render('login', {message: "Please enter both id and password"});
}
else
{
    adminUsersModel.find({userEmail : req.body.adminemail}).exec().then(
    user => {
        if(user.length < 1)
        {    
            res.render('login', {
                message: "User Email not found"});
        }

        bcrypt.compare(req.body.adminpassword, user[0].userPassword, (err, result) => {
        if(err)
        {
            res.render('login', {
                message: "Authentication failed"});
        }
        else if(result)
        {
            req.session.user = user[0].userEmail;
            res.redirect('/categories');
        }
        // res.render('login', {
        //     message: "Authentication Failed"});
        })
    }
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
    }

    );
}
  };

  exports.getUsers = (req, res, next) => {
        
    usersModel.find().exec().then((users) =>{
        
        res.render('listusers', { urls: "users", userslist: users  });

      }).catch((error) => {
        res.status(500).send(error);
      });
  };

  exports.deleteUsers = (req, res, next) => {
    usersModel.remove({_id:{$eq:req.params.id}}).then(
    req.method = 'GET',
    res.redirect('/users')
  ).catch((error) => {
    res.status(500).json({message: "User not found"});
  });
};