const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    categoryDescription:{
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

module.exports=mongoose.model("Category",categorySchema);