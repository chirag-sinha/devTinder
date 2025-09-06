const express = require('express');
const app = express();

//app.listen(3000);

//now to handle the reuqests , we use app.use 

// app.use("/" ,(req,res) => {
//     res.send("hello from the server side dashboard ....");
// })//this will be over ridden in all the cases .

app.get("/user" , (req,res) => {
    res.send({firstname : "Chirag " , lastname: "Sinha"});
})

app.get("/user/:userId/:name/:password" ,(req,res) => {
    console.log(req.params);
    res.send("hello from the server side dashboard ....");
})

app.get("/test", (req,res) => {
    res.send("you are at test server ....");
})

app.get("/home", (req,res) => {
    res.send("you are at home server ....");
})



//postcall
app.post("/user" , (req,res) => {
    console.log("data saved");
    res.send("hello the user data has been saved to the DB!!!");
})

//deletecall
app.delete("/user" , (req,res) => {
    res.send("deleted successfully !!");
})

app.listen(3000 , () => {
    console.log("server is listening on port 3000...");
})

// you can check by going on the localhost:3000.