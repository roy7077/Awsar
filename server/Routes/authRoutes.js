const express=require('express');
const router=express.Router();

const {sendOTP}=require('../Controllers/Auth');
const {signUp}=require('../Controllers/Auth');
const {login}=require('../Controllers/Auth');

router.post('/sendOtp',sendOTP);
router.post('/signUp',signUp);
router.post('/login',login);

module.exports=router;