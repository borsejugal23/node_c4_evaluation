const mongoose=require("mongoose");

const blacklistSchema=mongoose.Schema(
    {
        token:String
    }
)

const blacklistModel=mongoose.model("black",blacklistSchema);
module.exports={blacklistModel}