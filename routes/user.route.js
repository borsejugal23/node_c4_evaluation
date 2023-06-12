const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { userModel } = require("../model/user.model");
const { blacklistModel } = require("../model/blacklist.model");
require("dotenv").config()
const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married,}=req.body
    try {
    const existuser=await userModel.find({email});
    if (existuser.length){
        return res.status(400).json({error:"User already exist, please login"})
    }

    bcrypt.hash(password,5,async(err,hash)=>{
      if (err){
        res.status(200).json({error:err.message})
      }
      else{
        const user=new userModel({name,email,gender,password:hash,age,city,is_married});
        await user.save();
        res.status(200).json({data:req.body})
      }
    })
 } catch (error) {
    console.log("please ckeck again");
    res.status(400).json({error:error.message})
 }
})

userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existuser=await userModel.findOne({email});
        if (existuser){
            bcrypt.compare(password,existuser.password,(err,result)=>{
                if (result){
                    try {
                        let token=jwt.sign({userID:existuser._id},process.env.secret,{
                            expiresIn:"7d"
                        });

                        res.status(200).send({msg:"Login successful",token})
                    } catch (error) {
                        res.status(400).send({error:error.message})
                    }
                }else{
                    res.status(200).send({msg:"Login failed"})
                }

            })

        }else{
            res.status(200).send({msg:"user not found"})
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

userRouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];

    let black=new blacklistModel({token});
    await black.save();
    res.status(200).json({msg:"Logout successful"})

})
module.exports=userRouter