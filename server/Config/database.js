const mongoose=require('mongoose');
require('dotenv').config();

exports.dbConnect=()=>{
    mongoose.connect("mongodb+srv://raysagar807:1i5n0bJPRRCcNTfV@jobpost.znh0x0d.mongodb.net/fuck")
    .then(()=>{
        console.log("Databased connected successfully")
    })
    .catch((error)=>{
        console.log("Error while connecting to database");
    })
}