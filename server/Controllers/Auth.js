const User=require('../Models/User');
const OTP=require('../Models/OTP');
const Profile=require('../Models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

//send otp
exports.sendOTP=async (req,res)=>{
    try{

        //console.log("hello");
        //console.log(req.body);
        
        //data fetch from req's body
        const {email}=req.body;
        //console.log("email -> ",email);

        const isPresent=await User.findOne({email});

        //check is user already exist
        if(isPresent)
        {
            return res.status(400).json({
                success:false,
                message:"User already registered",
            })
        }

        //generate otp
        let otp;
        let isOtpPresent;
        let attempts = 0; // Track the number of attempts
        const MAX_ATTEMPTS=100;
        do {
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });

            isOtpPresent = await OTP.findOne({ otp });
            attempts++; // Increment attempts

            // Add a condition to break the loop after a certain number of attempts
            if (attempts > MAX_ATTEMPTS) {
                throw new Error("Maximum attempts reached. Unable to generate unique OTP.");
            }
        } while (isOtpPresent);

        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            data:otp,
        })
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:error.message,
        })
    }
}

//sign up
exports.signUp=async(req,res)=>{
    try{
        //fetch data from req's body
        //console.log(req.body);
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        }=req.body;

        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        console.log(accountType);
        console.log(otp);

        // validate data 
        if (!firstName || 
            !lastName || 
            !email || 
            !password || 
            !confirmPassword || 
            !accountType || 
            !otp) {
            return res.status(422).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        //console.log(106);

        // Check password and confirm password
        if (password !== confirmPassword) {
            return res.status(422).json({
                success: false,
                message: "Password and confirm password do not match."
            });
        }

        //console.log(116);

        // Check if user is already present
        const userDetails = await User.findOne({ email: email });

        if (userDetails) {
            return res.status(409).json({
                success: false,
                message: "User already exists."
            });
        }
        
        //console.log(128);

        //match otp
        const mostRecentOtp=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);

        if(!mostRecentOtp)
        {
            return res.status(422).json({
                success:false,
                message:"Invalid OTP. Please check and try again.",
            })
        }
        else if(otp!=mostRecentOtp.otp)
        {
            return res.status(422).json({
                success:false,
                message:"Invalid OTP. Please check and try again.",
            })
        }

        //console.log(148);
        //creating entry in Proile DB
        const ProfileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //store user in DB
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:ProfileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName }${lastName}`,
        })

        //return response
        return res.status(200).json({
            success:true,
            message:"User registered SuccessFully"
        })
        //return response
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while registering User"
        })
    }
}

//login
exports.login=async (req,res)=>{
    try{
        //fetch data from req body
        const {email,password}=req.body;
        
        //if fields are absent
        if(!email || !password)
        {
            return res.status(422).json({
                success:false,
                message:"All fields are required"
            })
        }

        //check user exist or not
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(409).json({
                success:false,
                message:"User is not registered , please signUp first"
            })
        }

        //passward matching
        if(await bcrypt.compare(password,user.password))
        {
            const payLoad={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token=jwt.sign(payLoad,process.env.JWT_SECRET,{
                expiresIn:"4h",
            })

            user.token=token;
            user.password=undefined;

            //create cookies and send
            const options={
                expries:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in SuccessFully"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}
