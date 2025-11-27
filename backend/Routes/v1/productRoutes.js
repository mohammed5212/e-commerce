const upload = require('../../Middlewares/multer');
const { create } = require('../../Controllers/productController');
const authAdmin = require('../../Middlewares/authAdmin');



const productRouter = require('express').Router();


productRouter.post('/create',authAdmin ,upload.single("image"), create);

module.exports = productRouter;