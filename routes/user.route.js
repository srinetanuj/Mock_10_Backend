const express = require('express');
const {UserModel} = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userRouter = express.Router();


userRouter.use(express.json());

userRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;

    try{
       const user_find = await UserModel.find({email});
       if(user_find.length>0){
        res.send(user_find);
       }else{
         bcrypt.hash(password, 5, async(err, hash_password)=>{
            if(err){
                console.log(err);
            }else{
                const user = new UserModel({name, email, password: hash_password});
                await user.save();
            }
         })
       }
    }catch(err){
        console.log(err);
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try{
      const userlog = await UserModel.find({email});
      if(userlog.length>0){
        bcrypt.compare(password, userlog[0].password, (err,result)=>{
            if(result){
                const token = jwt.sign({userID: userlog[0]._id}, "anuj");
                res.send({"Token":token,"Name":userlog[0].name})
            }else{
                res.send("Enter right credentials");
            }
        })
      }else{
        
        res.send("Enter right credentials");
      }
    }catch(err){
        console.log(err)
    }
})


module.exports = {
    userRouter
}