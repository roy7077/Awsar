const mongoose=require('mongoose');
require('dotenv').config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("Databased connected successfully")
    })
    .catch((error)=>{
        console.log("Error while connecting to database");
    })
}