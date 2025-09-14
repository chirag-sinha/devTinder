const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not correct email syntax!!");
            }
        }
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

userSchema.methods.getJWT = async function () {

    const user= this; 
    const token = await jwt.sign({ _id:user._id },"DEV@Tinder$123", {expiresIn:"7d"});
    return token;
    
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password ;
    const isPasswordValid = await bcrypt.compare (passwordInputByUser , passwordHash);
    return isPasswordValid;
};

module.exports =  mongoose.model("User" , userSchema);