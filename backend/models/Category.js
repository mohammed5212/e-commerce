const mongoose= require("mongoose")
const catogerySchema =new mongoose.Schema(
    {
        name: {type:String,required:true,unique:true},
        description:String,
    },{tymestap:true}
)
module.exports = mongoose.model ("catogry")