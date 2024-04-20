const Category=require('../Models/Category');

exports.createCategory=async(req,res)=>{
    try{
        //fetch data
        const{
            name,
            categoryDescription,
        }=req.body;

        //validate data
        if(!name || !categoryDescription)
        {
            return res.status(422).json({
                success:false,
                message:"All fields are required"
            })
        }

        //if this category already present return false
        const isPresent=await Category.find({name:name});
        
        if(isPresent.length!==0)
        {
            return res.status(409).json({
                success:false,
                message:"this category is already present"
            })
        }

        //create category
        const newCategory = await Category.create({
            name: name,
            categoryDescription:categoryDescription,
        });
    
        //return response
        return res.status(200).json({
            success:true,
            message:"Category created successFully",
            data:newCategory
        })
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error while creating Category",
        })
    }
}


//show category jobs
exports.showSelectedCategoryJobs=async(req,res)=>{
    try{
        //fetch data
        const{name}=req.body;

        //validate
        if(!name)
        {
            return res.status(422).json({
                success:false,
                message:"Please enter name of the category"
            })
        }

        //get jobs
        const categoryDetails=await Category.findOne(
            {name:name}
        ).populate("jobs").exec();

        const job=categoryDetails.jobs;

        //return response
        return res.status(200).json({
            success:true,
            message:"jobs fetched SuccessFully",
            data:job
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error while fetching jobs",
        })
    }
}