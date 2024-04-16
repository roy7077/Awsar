const express=require('express');
const {dbConnect}=require('./Config/database');
require('dotenv').config();
const app=express();

app.get('/',(req,res)=>{
    res.send ("hello");
})

const PORT=process.env.PORT || 8040;
app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`);
})

dbConnect();