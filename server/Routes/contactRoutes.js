const express=require('express');
const router=express.Router();

const {contactUs}=require('../Controllers/ContactUs');

router.post('/',contactUs);

module.exports=router;