
const express = require("express");
const adminRouter = express();
const {adminModel} = require("../db")
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_SECRECT} = require("../config")

adminRouter.use(express.json());
const {z} = require("zod");
const bcrypt = require("bcrypt");
adminRouter.post("/signup",async function(req,res){

    const requirebody = z.object({
        email : z.string().min(3).max(100).email(),
        password : z.string().min(3).max(100),
        firstName :z.string().min(3).max(100),
        lastName :z.string().min(3).max(100)

     })
     const parseDatawithsuccess = requirebody.safeParse(req.body);
     if(!parseDatawithsuccess.success){
       return  res.json({
            message:"Incoreet format ",
            error:parseDatawithsuccess.error
        })
     }
     const {email,password,firstName,lastName} = parseDatawithsuccess.data;
     
     const hashPassword = await bcrypt.hash(password,5);
     await adminModel.create({
        email:email,
        password:hashPassword,
        firstName:firstName,
        lastName:lastName
     })
    console.log(firstName,lastName);
    res.json({
        message:"You are logged in!!"
    })
})
adminRouter.post("/signin",async function(req,res){
    
    const { email,password } = req.body;
    const user = await adminModel.findOne({
        email:email,
       
    })
    if(user){
       const ispasswordcorrect = await bcrypt.compare(password,user.password);
    
    if(ispasswordcorrect){
       const token = jwt.sign({
          id : user._id
       },JWT_ADMIN_SECRECT)
       res.json({
          token:token
       })
    }else{
       res.status(404).json({
           message:"Incorrect email and password"
       })
    }
 }
})
adminRouter.put("/course",async function(req,res){
    const adminId = req.userId;
    const { title , description ,price , imageUrl , creatorid} = req.body;

    const course = adminModel.create({
        title:title,
        description :description,
        price:price,
        imageUrl:imageUrl,
        creatorid: adminId
    })
    res.json({
        message:"course created",
        creatorid :course._id
    })
})

adminRouter.put("/course/bulk",function(req,res){

})
module.exports = {
    adminRouter:adminRouter
}