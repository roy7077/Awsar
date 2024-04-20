const Contact=require('../Models/Contact');

exports.contactUs=async(req,res)=>{
    try{
        //fetch data
        const {name,email,query}=req.body;

        //validate
        if(!name || !email || !query)
        {
            return res.status(422).json({
                success:false,
                message:"Required all fields"
            })
        }

        //store in db
        await Contact.create({
            name,
            email,
            query
        })

        //return response
        return res.status(200).json({
            success:true,
            message:"Created contact successFully"
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success:false,
            message:"Error in contact us page"
        })
    }
}