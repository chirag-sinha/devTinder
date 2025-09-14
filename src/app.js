const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const validator = require("validator");
const { validateSignUpData } = require ("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

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

app.post("/signup", async (req, res) => {
     try {
    //validation of data 
    validateSignUpData(req);

    const {firstName ,lastName ,emailID, password} = req.body;

    //encryption of password
    const passwordHash = await bcrypt.hash(password ,10);
    console.log(passwordHash);

    const user = new User({
        firstName,
        lastName,
        emailID,
        password:passwordHash,
    });

    await user.save();
    res.send("data sent successfully");
 } catch (err){
    res.status(400).send("ERROR" + err.message);
 }
    
});

app.post("/login" , async (req,res) =>{
    try{
        const {emailID ,password} = req.body;
          
        const user = await User.findOne({emailID:emailID});
        if (!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid){
            //create JWT tokens
            const token = await user.getJWT(); 
            //send the token in a cookie and send the response
            res.cookie("token" , token,{expires: new Date(Date.now() + 8 * 3600000),});
            res.send("Login Successful");
        }else{
            throw new Error ("Invalid Credentials");
        }

       
    }catch (err){
    res.status(400).send("ERROR" + err.message);
 }
})

app.post("/sendConnectionRequest" , userAuth , async(req,res) => {
    const user = req.user ;

    console.log("sending connection request");
    res.send(user.firstName +" connected successfully");
})

app.get("/profile" , userAuth ,async (req,res) => {
    try
    {

        const user = req.user ;
        res.send(user);
        
    }catch(err){
    res.status(400).send("ERROR" + err.message);
 }
})
connectDB()
.then( () => {
    console.log("connection established successfully!!!");
    app.listen(3000 , () => {
    console.log("server is listening on port 3000...");
}); } )
.catch((err) => {
    console.error("database cannot be connected!!!");
})



// you can check by going on the localhost:3000.