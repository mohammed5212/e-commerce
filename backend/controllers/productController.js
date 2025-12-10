const { uploadToCloudinary } = require("../Utils/imageUpload");
const ProductDb = require("../models/productModel");



const create= async(req, res) => {

    try {
       const { title, description, price } = req.body;
       if (!title || !description || !price ||  !req.file) {
        return res.status(400).json({ message: "All fields are required" });
       }
       const cloudinaryRes = await uploadToCloudinary(req.file.path);
       console.log(cloudinaryRes,"image uploaded")

       const newProduct = new ProductDb({
        title,
        description,
        price,  
       
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

const listProducts = async (req, res) => {
    try {
        const products = await ProductDb.find();        
       res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const productDetails = async (req, res) => {
    try {
        const { productId } = req.params;   
        const product = await ProductDb.findById({_id: productId});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }   
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const {productId}=req.params
      const{title,description,price}=req.body
      let imageUrl;
    let isProductExist = await ProductDb.findById(productId)
        if(!isProductExist){
            return res.satus (404).json({message :"Product not found"})
        }
        if(req.file){
            const cloudinaryRes = await uploadToCloudinary(req.file.path);
            imageUrl= cloudinaryRes;
        }
        const uploadedProduct =await ProductDb.findByIdAndUpdate(productId,{
            title:title || isProductExist.title,
            description:description || isProductExist.description,  
            
            price:price || isProductExist.price,
            image:imageUrl || isProductExist.image,
        },{new:true})

        res.status(200).json({message:"Product updated successfully",uploadedProduct});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message ||'Server error' });
    }
};  

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;   
        const deletedProduct = await ProductDb.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }   catch (error) { 
        console.log(error);
        res.status(500).json({ error:error.message || 'Server error' });
    }

}   




      
module.exports = {create ,listProducts, productDetails, updateProduct, deleteProduct};