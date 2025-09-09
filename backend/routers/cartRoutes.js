const express =require("express")
const {protect}=require("../middleware/auth")

const{
    addToCart,
    updateCartitem,
    removeFromCart,
    clearCart,    
    getCart
}=require("../controllers/cartController")

const router =express.Router()

router.get("/",protect,getCart)
router.post("/",protect,addToCart)
router.put("/:productId",protect,updateCartitem)
router.delete("/productId",protect,removeFromCart)
router.delete("/",protect,clearCart)

module.exports= router