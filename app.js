const express = require('express');
const path = require('path')
const product = require('./app/product/routes');
const productV2 = require('./app/product_v2/router.js');
const logger = require('morgan')
const app = express();

//middleware custom logger
app.use(logger('dev'))

//menangani request method post dari form
app.use(express.urlencoded({extended: true}));
//menangani request method post berupa json
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))

//routes home and product
app.use('/api/v1', product)
app.use('/api/v2', productV2)

//404 page/response
app.use((req, res, next) => {
    res.status(404)
    res.send({
        status: "failed",
        message: req.originalUrl + "not found"
    })
})

app.listen(3000, () => console.log("server berjalan di port 3000"))




