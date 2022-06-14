
const { response, request } = require('express')
const bcryptjs = require('bcryptjs');


const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;
    const query = { state: true }
    // const users = await User.find(query)
    //     .skip(Number(since))
    //     .limit(Number(limit))

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number(limit))
    ])
    res.json({
        total,
        users
    })
}
const usersPost = async (req, res = response) => {

    const { name, password, email, rol } = req.body;
    const user = new User({ name, password, email, rol });

    //Encriptar passwd
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en bd
    await user.save();

    res.json(user)
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if (password) {
        //encriptar psswd
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user)
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    //const user = await User.findByIdAndDelete( id )
    const user = await User.findByIdAndUpdate(id, { state: false })
    res.json(user)
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}