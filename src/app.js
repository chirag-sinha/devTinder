const express = require('express');
const app = express();

// {  S02E04
//app.listen(3000);

//now to handle the reuqests , we use app.use 

// app.use("/" ,(req,res) => {
//     res.send("hello from the server side dashboard ....");
// })//this will be over ridden in all the cases .

// app.get("/user" , (req,res) => {
//     res.send({firstname : "Chirag " , lastname: "Sinha"});
// })

// app.get("/user/:userId/:name/:password" ,(req,res) => {
//     console.log(req.params);
//     res.send("hello from the server side dashboard ....");
// })

// app.get("/test", (req,res) => {
//     res.send("you are at test server ....");
// })

// app.get("/home", (req,res) => {
//     res.send("you are at home server ....");
// })



// //postcall
// app.post("/user" , (req,res) => {
//     console.log("data saved");
//     res.send("hello the user data has been saved to the DB!!!");
// })

// //deletecall
// app.delete("/user" , (req,res) => {
//     res.send("deleted successfully !!");
// })   

// }

// S02E05 Middlewares nad error handling - playing with routing and next();

app.use("/user" , (req,res,next) => {
    console.log("1st route handler being called .");
    next();
    res.send("1st Response !!!");
    
},
(req,res,next) => {
    console.log("2nd route handler being called .");
    next();
    res.send("2nd Response !!!");
},(req,res,next) => {
    console.log("3rd route handler being called .");
    next();
    res.send("3rd Response !!!");
},(req,res,next) => {
    console.log("4th route handler being called .");
    res.send("4th Response !!!");
});

app.listen(3000 , () => {
    console.log("server is listening on port 3000...");
})

// you can check by going on the localhost:3000.