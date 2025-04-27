
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const admin = require("../Routes/admin");
function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD);
    if(decoded){
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"Your not signed in"
        })
    }

}
module.exports = {
    adminMiddleware:adminMiddleware 
}