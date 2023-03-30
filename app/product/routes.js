const routerProduct = require('express').Router();
const multer = require('multer');
const upload = multer({dest:'uploads'})
const {getProducts, getSingleProduct, postSingleProduct, updateProduct, deleteProduct} = require('./controller')

routerProduct.get('/products', getProducts )
routerProduct.get('/products/:id', getSingleProduct)
routerProduct.post('/products/', upload.single('image'), postSingleProduct)
routerProduct.put('/products/:id', upload.single('image'),updateProduct)
routerProduct.delete('/products/:id', upload.single('image'), deleteProduct)

module.exports = routerProduct