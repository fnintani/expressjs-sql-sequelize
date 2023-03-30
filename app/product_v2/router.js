const router = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'uploads'})
const {postData, getProduct, getOneProduct, putProduct} = require('./controller')

router.get('/product', getProduct )
router.get('/product/:id', getOneProduct)
router.post('/product', upload.single('image'), postData)
router.put('/product/:id', upload.single('image'), putProduct)
// router.delete('/product/:id', upload.single('image'), deleteProduct)

module.exports = router;