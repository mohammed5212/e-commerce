const mongoose = require("mongoose")

const orderItemSchema = new mongoose.schema (
    {
        order_id : {type:mongoose.Schema.Types.ObjectId,ref :"Order",required:true},
        product_id :{type: mongoose.Schema.Types.ObjectId,ref:"Product",required :true},
        quantity:{type:Number,required: true},
        price: {type:Number,required:true},

    },{timestamps:true}
)
//  Virtual populate (Order → OrderItems)//
orderSchema.virtual("orderItems", {
  ref: "OrderItem",         // The model to use//
  localField: "_id",        // Find OrderItems where `order_id` = this._id//
  foreignField: "order_id"
});

// Enable virtuals in JSON and objects//
orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("OrderItem",orderItemSchema)