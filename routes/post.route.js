const express=require("express");
const { postModel } = require("../model/post.model");
const { auth } = require("../middleware/auth");
const postRouter=express.Router();


postRouter.use(auth)


postRouter.post("/add",async(req,res)=>{
    try {
        const post=new postModel(req.body);
        await post.save()
        res.send({msg:"new post added",post:req.body})
    } catch (error) {

        res.send({error:error.message})
    }
});

postRouter.get("/",async(req,res)=>{
    try {
        const post=await postModel.find({userid:req.body.userid});
        res.status(200).send({posts:post})
    } catch (error) {

        res.status(400).send({error:error.message})
    }
});


module.exports={postRouter}