const express =require("express")
const router= express.Router()
const {protect,authorize}=require("../middleware/auth")
const { getAllUsers, deleteUser, getUserById, updateUser, getProfile, updateProfile }=require("../controllers/userController")

//admin only
router.get("/",protect,authorize("admin"),getAllUsers)
router.delete("/:id",protect,authorize("admin"),deleteUser)

//admin and self
router.get("/:id",protect,getUserById)
router.put("/:id",protect,updateUser)

//user self profile
router.get("/me/profile",protect,getProfile)
router.put("/me/profile",protect,updateProfile)

module.exports=router