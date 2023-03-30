const fs = require('fs')
const path = require('path')
const Product = require('./model')

const getProduct = async (req, res) => {
    try {
        const result = await Product.findAll();
        res.send({message: "success get products", result})
    } catch(error) {
        res.send(error)
    }
}

const getOneProduct = async (req, res) => {
    const {id} = req.params
    try {
        const result = await Product.findOne({ where: {id}});
        res.send({message: "success get one product", result})
    } catch(error) {
        res.send(error)
    }
}

const putProduct = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    try {
        if(image) {
            const target = path.join(__dirname, '../../uploads', image.originalname);
            fs.renameSync(image.path, target)
            const result = await Product.update({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`, where: req.params.id})
            res.send(result)
        } else {
            const result = await Product.update({users_id, name, price, stock, status, where: req.params.id})
            res.send(result)
        }
    }
    catch(error) {
        res.send(error)
    }
}

const postData = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
    }
    try {
        await Product.sync();
        const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {postData, getProduct, getOneProduct, putProduct}