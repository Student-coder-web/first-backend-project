   const {Router} = require("express");
  
   const courseRouter= Router();
    const{userMiddleware} = require("../middleware/users");
    const{ purchasesModel, courseModel} = require("../db")

   courseRouter.post('/purchases',userMiddleware, async function(req,res){
           const userId =req.userId;
           const courseId = req.body.courseId;

           await purchasesModel.create({
            userId,
            courseId
           })
           res.json({
            message:"You have succesfully bought the course!"
           })
         
    })
    
    courseRouter.get("/preview",userMiddleware,async  function(req,res){
       const course = await courseModel.find({});
       res.json({
        course
       })
    })


module.exports = {
    courseRouter:courseRouter
}