const mongoose=require('mongoose');
const mailSender=require('../Utils/mailSender');

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

// a function -> to send emails
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification Email from Awsar",otp);
        //console.log("Email send Successfully: ",mailResponse);
    }
    catch(error){
        console.log("error occured while sending mails ", error);
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    //console.log(this.otp);
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("OTP",otpSchema);