const { validateSignUpData } = require ("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const express = require("express");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login" , async (req,res) =>{
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

authRouter.pose("/logout" , async(req,res)=>{
    
})

module.exports = authRouter ;

