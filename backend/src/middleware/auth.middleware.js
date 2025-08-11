const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(404).json({
            message: "Token expired, Login required."
        });
    }

    try{

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
        if(!decoded){
            return res.status(403).json({
                message: "Token is invalid."
            })
        }
        
        const user = await userModel.findOne({username: decoded.username});
        
        req.user = user;
        next();

    }catch(err){
        res.status(401).json({
            message: err.message
        })
    }


}

module.exports = authMiddleware;