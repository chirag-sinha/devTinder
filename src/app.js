const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

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

app.patch("/user" , async (req,res)=>{
    console.log(req.body);
        const userId = req.body.userId ;
        const data = req.body ;
    try {
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
    const user = new User(req.body);
 try {
    await user.save();
    res.send("data sent successfully");
 } catch (err){
    res.status(400).send("can not send the data!!!" + err.message);
 }
    
});




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