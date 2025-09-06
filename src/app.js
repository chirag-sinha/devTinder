const express = require('express');
const app = express();

//app.listen(3000);

//now to handle the reuqests , we use app.use 
app.get("/" ,(req,res) => {
    res.send("hello from the server side dashboard ....");
})

app.get("/test", (req,res) => {
    res.send("you are at test server ....");
})

app.get("/home", (req,res) => {
    res.send("you are at home server ....");
})

app.listen(3000 , () => {
    console.log("server is listening on port 3000...");
})

// you can check by going on the localhost:3000.