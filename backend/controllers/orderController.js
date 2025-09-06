const Order = require("../models/Order")
const OrderItem=require("../models/OrderItem")


// create new Order//
const createOrder =async (req,res) =>{
    try{
        const {shippingAddress,items}=req.body
        const userId = req.user.id    //from auth //


        if (!items ||items.length===0){
            return res.status(400).json({message:"no items in order"})
        }
        // 1.calculate total amount//
        const totalAmount = items.reduce((acc, item) =>acc +item.price*item.quantity,0)
        // 2. create order //
        const order =new Order({
            user_id:userId,shippingAddress,totalAmount
        })
        await order.save()    

        // 3.create order items//
        const orderItems =await Promise.all(
            items?.map((item)=>new OrderItem({
                order_id:order._id,
                product_id:item.product_id,
                quantity:item.quantity,
                price:item.price
            }).save()
        )
        )
        res.status(201).json({message:"Order created successfully",order,orderItems})

    }catch(error){
        res.status(500).json({message:error.message})
    }
}  
// /Get Order by Id (with populate)//

const getOrderById = async (req ,res)=>{
    try{
       const order = await Order .findById(req.params.id)
     .populate("user_id","username email")   ///user info
     .populate({
        path:"orderItems", //order -> items
        populate:{
            path:"orderItems", //items  -> product
            select:"name price catogery",
            populate:{path:"category_id",select:"name"}  //product -> category


        }
     })
        if (!order){
            return res.status(404).json({message:"Order not found"})
        }
        res.json(order)
    }catch(error){
        res.status (500).json({message:error.message})
    }
}

///Get all orders(admin)//

const getAllOrders =async(req,res) =>{
    try{
        const orders = await Order.find()
        .populate("user_id","username email")
        .populate({
            path:"orderItems",
            populate:{path:"product_id",select:"name price"}
        })
        .sort({createAt: -1})
        res.json(orders)
    } catch(error){
        res.status(500).json({message:error.message})
    }
}

///Update Order Status

const updateOrderStatus = async (req, res)=>{
    try{
        const {status} =req.body
        const order = await Order.findByIdAndUpdate(req.params.id,{ status},{new :true})
        if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order });

    }catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//delete an order (admin only)

const deleteOrder= async (req,res)=>{
    try{
        const order =  await Order.findById(req.params.id)
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        //delete order items also//
        await OrderItem.deleteMany({order_id:order._Id})
        await order.deleteOne()

        res.json({message:"Order and its items deleted successfully"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports={createOrder,getOrderById,getAllOrders,updateOrderStatus,deleteOrder}