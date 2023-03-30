const connection = require('../../config/mysql')
const fs = require('fs')
const path = require('path')

const getProducts = (req, res) => {
    const {search} = req.query
    let exce = {}
    if(search) {
       exce = {
        sql: 'SELECT * FROM products WHERE name LIKE ?',
        values: [`%${search}%`]
        }
    }else {
        exce = {
        sql: 'SELECT * FROM products'
        }
    }
    connection.query(exce, _response(res))
}

const getSingleProduct = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM products WHERE id = ?',
        values: [req.params.id]
    }, _response(res))
}

const postSingleProduct = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        connection.query({
            sql: 'INSERT INTO products (users_id, name, price, stock, status, images_url) VALUES (?, ?, ?, ?, ?, ?)',
            values: [users_id, name, price, stock, status, `http://localhost:3000/public/${image.originalname}`]
        }, _response(res))
    }
}

const updateProduct = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let sql = '';
    let values = [];
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, images_url = ? WHERE id = ?'
        values = [users_id, name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id]
    } else {
        sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?'
        values = [users_id, name, price, stock, status, req.params.id]
    }
    connection.query({sql, values}, _response(res))
}

const deleteProduct = (req, res) => {
    connection.query({
        sql: 'DELETE FROM products WHERE id = ?',
        values: [req.params.id]
    }, _response(res))
}

const _response = (res) => {
    return (error, result) => {
        if(error) {
            res.send({
                status: "failed",
                response: error
            })
        } else {
            res.send({
                status: 'success',
                response: result
            })
        }
    }
}

module.exports = {
    getProducts,
    getSingleProduct,
    postSingleProduct,
    updateProduct,
    deleteProduct
}