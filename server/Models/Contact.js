const mongoose=require('mongoose');
const mailSender=require('../Utils/mailSender');

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    query:{
        type:String,
        required:true,
    }
})


// a function -> to send emails
async function sendVerificationEmail(name,email,query){
    try{
        const mailResponse=await mailSender(email,"Verification Email from Awsar","Thank you for Your feekback, We will reach to you soon");
    }
    catch(error){
        console.log("error occured while sending mails ", error);
        throw error;
    }
}

contactSchema.pre("save",async function(next){
    await sendVerificationEmail(this.name,this.email,this.query);
    next();
})


module.exports=mongoose.model("Contact",contactSchema);