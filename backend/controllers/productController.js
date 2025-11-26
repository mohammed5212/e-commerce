const { uploadToCloudinary } = require("../Utils/imageUpload");
const ProductDb = require("../models/productModel");
const create= async(req, res) => {

    try {
       const { title, description, price, duration } = req.body;
       if (!title || !description || !price || !duration || !req.file) {
        return res.status(400).json({ message: "All fields are required" });
       }
       const cloudinaryRes = await uploadToCloudinary(req.file.path);
       console.log(cloudinaryRes,"image uploaded")

       const newProduct = new ProductDb({
        title,
        description,
        price,  
        duration,
        image: cloudinaryRes, // Use the URL from Cloudinary
       });
       let savedProduct =
       await newProduct.save();  
       if(savedProduct){
        console.log("Product saved successfully:", savedProduct);   
       }      


        console.log(req.file,"image uploaded by multer");
        res.status(200).json({message:"Product created successfully"});
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error:error.message ||  'Server error' });
    }
}
module.exports = {create};