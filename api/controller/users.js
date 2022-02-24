const usersModel = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('./../../util/utilconf');


exports.adduser = (req, res, next) => {
            try
            {
                usersModel.find({userEmail: req.body.userEmail}).exec().then(user => {
                    if(user.length >= 1)
                    {
                        return res.status(409).json({
                            error : "Email already exists"
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
                                    
                                    res.status(201).json({                                        
                                        message: "User Created"
                                    })
                                } ).catch(err => {
                                    
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
                    error : "Authentication Failed"
                })
            }
            bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {
                if(err)
                {
                    return res.status(404).json({
                        error: "Authentication Failed"
                    })
                }
                if(result)
                {
                    const token = jwt.sign({
                        email: user[0].userEmail,
                        id: user[0]._id
                    }, JWT_KEY , 
                    {
                        expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message : 'Authentication Successful',
                        token : token,
                        userid: user[0]._id
                    })
                }

                res.status(404).json({
                    error: "Authentication Failed"
                })

            })
        }
    ).catch(err => {
        
        res.status(500).json({
            error : err.message
        })
    }

    );
  };


  exports.userchangepassword = (req, res, next) => {
    
    try
    {
        usersModel.find({_id: req.body.userId}).exec().then(user => {
            if(user.length >= 1)
            {
                if(req.body.userPassword.trim() === "")
                {
                    return res.status(500).json({
                        error: "Please provide password"
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
                            usersModel.findOneAndUpdate({_id: req.body.userId}, {$set:{userPassword:hash}}, {new: true}).exec().then((result) => 
                            {
                                return res.status(200).json({
                                    message: "Password updated successfully"
                                })
                            })                        
                        }
                    })
                }   
            }
            else
            {
                return res.status(404).json({
                    message : "User does not exists"
                })
                
            }
        });
    }
    catch(ex)
    {
        return next(ex);
    }
};