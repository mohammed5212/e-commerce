const Product =require("../models/Product")
 
//create new product (admin only)
const createProduct= async(req,res)=>{
    try{
        const {name,description, price, stock, category_id  } =req.body
        if(!name || !price || !stock){
            return res.status(400).json({message:"Name, price and stock are required"})
        }
        const product =new Product ({name,description, price,stock,category_id})
        await product.save()
        res.status(201).json({message :"product created successfully",product})
    }catch(error){
        res.status(500).json ({message :"server error",error:error.message})
    }
}
//get all products//
const getAllProducts=async (req,res)=>{
    try{
        const products =await Product.find().populate("category","name description")
        res.status (200).json(products)
    }catch(error){
        res.status(500).json({message:"server error",error: error.message})
    }
}
//get single product by id//
const getProductById = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id).populate("category", "name description")
        if (!product){
            return res.status(404).json({message:"Product not found"})

        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json ({message :"server error",error:error.message})
    }
}
//Update product by id //
const updateProduct =async(req,res)=>{
    try{
        const{name,description,price,stock, category}=req.body
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {name, description, price,stock, category },
            {new:true,runValidators:true}
        )
          if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json ({message :"Product updated successfully",product})

    }catch(error){
        res.status(500).json({message :"server error",error:error.message})
    }
}
//delete product by id//
const deleteProduct= async(req,res)=>{
   try {
     const product = await Product.findByIdAndDelete(req.params.id)
    if (!product){
        return res.status(404).json({message:"Product not found"})
    }
    res.status(200).json({message:"Product deleted successfully"})
}catch (error){
    res.status(500).json({message:"server error",error:error.message})
}
   }

   module.exports={createProduct,getAllProducts,getProductById,updateProduct,deleteProduct}