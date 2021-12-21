const usersModel = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.adduser = (req, res, next) => {
    
            try
            {
                usersModel.find({userEmail: req.body.userEmail}).exec().then(user => {
                    if(user.length >= 1)
                    {
                        return res.status(409).json({
                            message : "Email already exists"
                        })
                    }
                    else
                    {
                        bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                            if(err) {
                                return res.status(500).json({
                                    error: err.message
                                })
                            } else {
                                const users = new usersModel({
                                    userEmail : req.body.userEmail,
                                    userMobile : req.body.userMobile,
                                    userPassword : hash
                                });
                                users.save().then(result => {
                                    console.log(result);
                                    res.status(201).json({
                                        message: "User Created"
                                    })
                                } ).catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error : err.message
                                    })
                                });
                            }
                        })
                    }
                });
            }
            catch(ex)
            {
                return next(ex);
            }
  };

  exports.userlogin = (req, res, next) => {
    usersModel.find({userEmail : req.body.userEmail}).exec().then(
        user => {
            if(user.length < 1)
            {
                return res.status(401).json({
                    message : "Authentication Failed"
                })
            }
            bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {
                if(err)
                {
                    return res.status(404).json({
                        message: "Authentication Failed"
                    })
                }
                if(result)
                {
                    const token = jwt.sign({
                        email: user[0].userEmail,
                        id: user[0]._id
                    }, process.env.JWT_KEY  , 
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message : 'Authentication Successful',
                        token : token
                    })
                }

                res.status(404).json({
                    message: "Authentication Failed"
                })

            })
        }
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
    }

    );
  };