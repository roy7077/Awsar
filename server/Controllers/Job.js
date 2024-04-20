const Job=require('../Models/Job');
const Category=require('../Models/Category');

exports.createJob=async(req,res)=>{
    try{
        //fetch data from req's body
        const{
            companyName,
            location,
            batchEligible,
            jobDescription,
            role,
            category,
            applyLink
        }=req.body;

        //validate data
        if(!companyName || !location || !batchEligible || !jobDescription || !role || !category || !applyLink)
        {
            return res.status(422).json({
                success:false,
                message:"Please enter all fields"
            })
        }

        //store in DB
        const newJob=await Job.create({
            companyName,
            location,
            batchEligible,
            jobDescription,
            role,
            category,
            applyLink
        });

        const categoryDetails = await Category.findOneAndUpdate(
            { name: category },
            { 
                $push: { jobs: newJob._id } 
            }, // Using $push to add newJob._id to the jobs array
            { new: true } // Option to return the updated document
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"Job created successFully",
            data:newJob
        })
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while creating a Job"
        })
    }
}



exports.deleteJob=async(req,res)=>{
    try{
        //fetch data
        const{jobId}=req.body;

        //validate
        if(!jobId)
        {
            return res.status(422).json({
                success:false,
                message:"Job id is missing"
            })
        }

        // Find the job details by its ID
        const jobDetails = await Job.findById(jobId);
        const category = jobDetails.category;

        // Remove the job document
        await Job.findOneAndDelete({ _id: jobId });

        // Remove the job ID from the category document
        await Category.findOneAndUpdate(
            { name: category }, // Find the category document by its name
            {
                $pull: {
                    jobs: jobId // Pull the jobId from the jobs array
                }
            }
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"Job deleted SuccessFully"
        })
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while deleting a"
        })
    }
}

//get all jobs
exports.getAllJobs=async(req,res)=>{
    try{
        //fetch jobs
        const jobs=await Job.find({}).sort({createdAt:-1});

        //return jobs
        return res.status(200).json({
            success:true,
            message:"Jobs fetched successFully",
            data:jobs
        })
    }
    catch(error)
    {
        conolse.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while fetching all jobs"
        })
    }
}