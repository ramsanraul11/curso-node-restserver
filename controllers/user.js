
const { response, request } = require('express')

const usersGet = (req = request, res = response) => {

    const { user, surname } = req.query;

    res.json({
        msg: 'peticion GET a /api from CONTROLER',
        user,
        surname
    })
}
const usersPost = (req, res = response) => {

    const { name, age } = req.body;

    res.json({
        msg: 'peticion POST a /api from CONTROLER',
        name,
        age
    })
}

const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'peticion PUT a /api from CONTROLER',
        id
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'peticion DELETE a /api from CONTROLER'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}