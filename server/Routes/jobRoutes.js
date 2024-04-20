const express=require('express');
const router=express.Router();

const {createJob}=require('../Controllers/Job');
const {deleteJob , getAllJobs}=require('../Controllers/Job');
const {authz}=require('../Middlewares/Authz');
const {isAdmin , isStudent}=require('../Middlewares/Authz');


router.post('/createJob',authz,isAdmin,createJob);
router.post('/deleteJob',deleteJob);
router.get('/getAllJobs',getAllJobs);

module.exports=router;