const jwt =require("jsonwebtoken");
require("dotenv").config()

const auth=(req,res,next)=>{
   const token=req.headers.authorization?.split(" ")[1];

   if (token){
    try {
        const decoded=jwt.verify(token,process.env.secret);
        if (decoded){
            req.body.userid=decoded.userid;
            req.body.user=decoded.username;
            next()
        }else{
            res.status(200).json({"msg":"token is not valid"})
        }
    } catch (error) {
        res.status(404).json({error:error.message})

    }
   }
   else{

    res.status(200).json({"msg":"login first"})

   }
}
module.exports={auth}