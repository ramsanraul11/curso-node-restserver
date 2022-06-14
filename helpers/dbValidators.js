const Rol = require('../models/rol')
const User = require('../models/user')



const roleIsValid = async (rol = '') => {
    const rolExists = await Rol.findOne({ rol });
    if (!rolExists) {
        throw new Error(`This rol doesn't exists`)
    }
}

//Verificar mail si existe
const emailIsExisting = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`${email} already exists`)
    }
}

const existUserById = async( id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`Id ${id} doesn't exists`)
    }
}



module.exports = {
    roleIsValid,
    emailIsExisting,
    existUserById
}