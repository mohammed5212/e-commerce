const mongoose =require("mongoose")
const orderSchema =new mongoose.Schema(
    {
        user_id : {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        shippingAddress:{type:Object,required:true},
        orderDate:{type:date ,default:Date.now},
        status:{type:String, enum: ["pending","paid","shipped","delivered","cancelled"],default:"pending"},
    },{tymestamps:true}
)
module.exports= mongoose.model("Order",orderSchema)