const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type:String, 
        required: true,
        minLength: 3,
        maxLength: 30,
   },
   lastName : {
        type:String,

   },
   emailID : {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
   },
   password : {
    type:String,
    required:true,
   },
   age : {
    type:Number
   },
   gender : {
    type: String,
    validate (value){
        if(!["male" , "female" , "others"].includes(value)){
            throw new Error("Gender not valid!!!");
        }
    }
   },
   about :{
    type:String ,
    default:"this is the default description of user",
   },
   skills : {
    type:[String],
   } 
},
{
    timestamps:true,
});

module.exports =  mongoose.model("User" , userSchema);