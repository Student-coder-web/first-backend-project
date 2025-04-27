  const express = require("express");
  const { Router } = express;
  const userRouter =  Router(); 
  const { userModel} = require("../db")
  const { z } = require("zod")
  const bcrypt = require("bcrypt");
  userRouter.use(express.json());
  const jwt = require("jsonwebtoken")
  const {JWT_USER_SECRECT} = require("../config")
  

    userRouter.post("/signup", async function(req,res){
        
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
         await userModel.create({
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
    userRouter.post("/signin",async function(req,res){
      const { email,password }=req.body;
      const user = await userModel.findOne({
          email:email,
         
      })
      if(user){
         const ispasswordcorrect = await bcrypt.compare(password,user.password);
      
      if(ispasswordcorrect){
         const token = jwt.sign({
            id : user._id
         },JWT_USER_SECRECT)
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
    
    userRouter.get("/purchases",function(req,res){
    
    })
 module.exports = {
    userRouter:userRouter
 }