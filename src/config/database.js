const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://chiragsinha73_db_user:6s3JVA3fJCkdDPIN@mongocluster.x0xnohi.mongodb.net/devTinder");

} ;

module.exports = connectDB ;