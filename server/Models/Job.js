const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    batchEligible:[
        {
            type:String,
            required:true
        }
    ],
    jobDescription:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    skills:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Skills",
        }
    ],
})

module.exports=mongoose.model("Job",jobSchema);