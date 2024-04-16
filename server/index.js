const express=require('express');
const {dbConnect}=require('./Config/database');
const authRoutes=require('./Routes/authRoutes');

require('dotenv').config();

const app=express();

app.use(express.json());

app.post('/',(req,res)=>{
    console.log(req.body);
    return res.status(200).json({
        success:true,
        data:req.body
    })
})

app.use('/api/v1',authRoutes);


// app.post('/api/v1/sendOtp',async (req,res)=>{
//     console.log(req);
//     return res.status(200).json({
//         success:true,
//     })
// });

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`);
})

dbConnect();