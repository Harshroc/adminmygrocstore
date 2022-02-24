const jwt = require('jsonwebtoken');
const JWT_KEY = require('./../../util/utilconf');

module.exports = (req, res, next) => {
    
    try
    {
        if(!req.headers.authorization)
        {
            return res.status(401).json({
                error: "Please login"
            })
        }
        else
        {
            const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY);
        
        req.userData = decoded;
        next();
        }
        
    }catch(error){

        return res.status(401).json({
            error: "Authentication Failed-"+error.message
        })
    }
    

};