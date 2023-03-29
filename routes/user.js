const routerUser = require('express').Router();

routerUser.get('/user', (req, res) => {
    const {page, total} = req.query;
    res.send({
        status: 'success',
        message: 'welcome user',
        page,
        total,
    })
})

routerUser.get('/user/:id', (req, res) => {
    res.json({
        id: req.params.id
    })
})

module.exports = routerUser;