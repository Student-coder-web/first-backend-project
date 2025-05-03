const express  =  require("express");

const mongoose = require("mongoose")
const{ userRouter} = require("./Routes/user");
const{ courseRouter} = require("./Routes/courses")
const{ adminRouter } = require("./Routes/admin")
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter) 
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/course", courseRouter)

 async function main(){
    await mongoose.connect("");
    console.log("connnected");
}
main();
app.listen(3000);



