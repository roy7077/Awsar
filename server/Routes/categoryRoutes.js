const express=require('express');
const router=express.Router();

const {createCategory}=require('../Controllers/Category');
const {showSelectedCategoryJobs}=require('../Controllers/Category');

router.post('/createCategory',createCategory);
router.post('/showSelectedCategoryJobs',showSelectedCategoryJobs);

module.exports=router;