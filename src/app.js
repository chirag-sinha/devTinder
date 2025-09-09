const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();



app.post("/signup", async (req, res) => {
    const user = new User({
    firstName: "Akshay",
    lastName: "Saini",
    emailID: "akshay@saini.com",
    password: "akshay@123",
});
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