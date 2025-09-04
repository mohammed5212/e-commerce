const mongoose= require('mongoose')
require('dotenv').config()

const connectDB=async(mongoUri)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected:${process.env.MONGO_URI}`)
    }catch(error){console.error('mongodb connection error:',error .message)
        process.exit(1)
    }
}
module.exports =connectDB