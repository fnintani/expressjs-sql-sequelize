const express = require('express');
const product = require('./routes/product');
const user = require('./routes/user')
const log = require('./middleware/logger')
const app = express();

//middleware custom logger
app.use(log)

//menangani request method post dari form
app.use(express.urlencoded({extended: true}));
//menangani request method post berupa json
app.use(express.json());

//routes home and product
app.use(product)

//routes user
app.use(user)

//404 page/response
app.use((req, res, next) => {
    res.status(404)
    res.send({
        status: "failed",
        message: req.originalUrl + "not found"
    })
})

app.listen(3000, () => console.log("server berjalan di port 3000"))




