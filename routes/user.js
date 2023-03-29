const routerUser = require('express').Router();

routerUser.get('/user', (req, res) => {
    res.json({
        status: 'success',
        message: 'welcome user',
    })
})

routerUser.get('/user/:id', (req, res) => {
    res.json({
        id: req.params.id
    })
})

module.exports = routerUser;