const jwt = require('jsonwebtoken');

const authAdmin =(req,res)=>{
    try {
        const admin_token = req.cookies
        if (!admin_token) {
            return res.status(401).json({ message: "No token provided, authorization denied." });
        }   
        const decoded = jwt.verify(admin_token.token, process.env.JWT_SECRET);
        req.admin = decoded.adminId;
        next();


}catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message ||  'Server error' });
    }   
}

module.exports=authAdmin;