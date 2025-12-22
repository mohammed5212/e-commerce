const adminRouter = require('./adminRoutes');
const productRouter = require('./productRoutes');
const userRouter = require('./userRoutes');
const categoryRouter = require('./categoryRoutes');
const v1Router = require('express').Router()


v1Router.use('/user',userRouter)
v1Router.use('/admin',adminRouter)
v1Router.use('/product',productRouter)
v1Router.use('/category',categoryRouter)


module.exports = v1Router;