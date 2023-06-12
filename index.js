const express=require("express");
const { connection } = require("./db");
const userRouter = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
require("dotenv").config()

const app=express();

app.use(express.json());

app.use("/users",userRouter);
app.use("/posts",postRouter)

app.listen(process.env.port, async()=>{
    try {
      await connection
      console.log(`server is running at ${process.env.port}`)
    
  } catch (error) {
    console.log(error)
  }
})