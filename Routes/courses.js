   const {Router} = require("express");

   const courseRouter= Router();
    
   
   courseRouter.post('/purchases',function(req,res){
        
         
    })
    
    courseRouter.get("/preview",function(req,res){
        res.json({
            message:"jdfpo"
    })
    })


module.exports = {
    courseRouter:courseRouter
}