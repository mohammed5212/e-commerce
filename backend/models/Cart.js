const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user_id : {type:mongoose.Schema.Types.ObjectId,ref: "User",required:true},
    
},{tymestamps:true})
module.exports = mongoose.model("Cart",cartSchema)