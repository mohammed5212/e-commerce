const express = require("express")
const router = express.Router()
const {protect, authorize}=require("../middleware/auth")
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,}=require("../controllers/productController")


///public routes///
router.get("/",getAllProducts)        ///get all products
 router.get("/:id",getProductById)    ///get single product by id

///proected routes (admin only)

 router.post("/",protect,authorize("admin"),createProduct)     ///create product
 router.put("/:id",protect,authorize("admin"),updateProduct)     //update product
 router.delete("/:id",protect,authorize("admin"),deleteProduct)   //delete product

module.exports=router