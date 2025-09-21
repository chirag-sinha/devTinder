const express = require('express');
const connectDB = require("./config/database");
const app = express();


const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");


app.use(express.json());
app.use(cookieParser());

app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);


app.get("/user" , async (req ,res)=> {
    const userEmail = req.body.emailID ;
    try {
        console.log(userEmail);
        const user = await User.find({emailID : userEmail});
        if(!user){
            res.status(404).send("user not found!!!");
        }else{
            res.send(user);      
        }
    }catch(err){
        res.status(404).send("Something went so much wrong!!!");
    }
});

app.delete("/user", async (req,res) => {
    const userId = req.body.userId ;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully!!!");

    }catch(err){
        res.status(404).send("Something went so much wrong!!!");
    }
})

app.patch("/user/:userId" , async (req,res)=>{
    
        const userId = req.params?.userId ;
        const data = req.body ;
    try {
        const ALLOWED_UPDATES = ["age" , "about" , "gender" , "skills"];
        const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Some fields not Allowed to be updated.");
        }

        await User.findByIdAndUpdate(userId , data);
        console.log(data);
        res.send("User updated SuccessFully");

    }catch(err){
        res.status(404).send("Something went so much wrong!!!");
    }
})

app.get("/feed" , async (req,res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err) {
        res.status(400).send("Something went wrong!!!");  
    }
})

connectDB()
.then( () => {
    console.log("connection established successfully!!!");
    app.listen(3000 , () => {
    console.log("server is listening on port 3000...");
}); 
})
.catch((err) => {
    console.error("database cannot be connected!!!");
})







// you can check by going on the localhost:3000.