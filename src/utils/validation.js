const validator = require("validator");

const validateSignUpData = (req) =>{
    const { firstName , lastName , emailID , password } = req.body ;
    if(!firstName || !lastName){
        throw new Error("firstName or LastName does not exists!!");
    }else if(!validator.isEmail(emailID)){
        throw new Error ("Email Id is invalid.");
    }else if(!validator.isStrongPassword(password)){
        throw new Error ("password is not Strong .");
    }
}

module.exports = {
    validateSignUpData,
}