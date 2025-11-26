const upload = require('../../Middlewares/multer');
const { create } = require('../../Controllers/productController');



const productRouter = require('express').Router();


productRouter.post('/create',upload.single("image"), create);

module.exports = productRouter;