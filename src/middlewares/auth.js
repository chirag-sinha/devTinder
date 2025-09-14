const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth =  async (req,res,next) => {
   try
   {//read the token from the cookiies 
   const {token} = req.cookies;
   if(!token){
    throw new Error("Token is not valid.")
   }
   
   //decodeduserid
   const decoded = await jwt.verify(token, "DEV@Tinder$123");
   //validate the token
   const {_id} = decoded ;
   
   const user = await User.findById(_id)
   
   //find the user

   if(!user){
    throw new Error("User not found");
   }
   req.user = user;
   next();
}catch(err){
    res.status(400).send("Error:" + err.message);

}
};


module.exports = {
     userAuth ,
}
