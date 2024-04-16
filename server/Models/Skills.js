const mongoose=require('mongoose');

const skillSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    skillDescription:{
        type:String,
        required:true,
    },
    jobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job",
        }
    ],
})

module.exports=mongoose.model("Skills",skillSchema);