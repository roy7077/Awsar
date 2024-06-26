const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authz = async (req, res, next) => {
    try {
        //console.log(req.body);
        // console.log(req);
        const token = req.body.token || req.cookies.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ",""));

        // console.log("re.body ", req.body.token);
        // console.log("cookies ",req.cookies.token);
        //console.log("header ",req.header("Authorization").replace("Bearer ",""))
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing."
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token."
        });
    }
    next();
};



exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Access forbidden. This protected route is only for students."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role does not match"
        });
    }
};


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Access forbidden. This protected route is for admins only."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role does not match"
        });
    }
};