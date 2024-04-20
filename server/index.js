const express = require('express');
const { dbConnect } = require('./Config/database');
const authRoutes = require('./Routes/authRoutes');
const jobRoutes=require('./Routes/jobRoutes');
const categoryRoutes=require('./Routes/categoryRoutes');
const contactRoutes=require('./Routes/contactRoutes');
const cookieParser = require('cookie-parser');

const cors=require('cors');

const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

// Remove express.json() middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.post('/', (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        success: true,
        data: req.body
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/contactUs',contactRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});

dbConnect();

