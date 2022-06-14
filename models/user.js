
// {
//     name: '',
//     email: '',
//     password: '',
//     img: '',
//     rol: Number,
//     state: true,
//     google: true
// }

const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String, 
        required: [true, 'Name is mandatory']
    },
    email: {
        type: String, 
        required: [true, 'Email is mandatory'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Password is mandatory'],
    },
    password: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROL', 'USER_ROL']
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },

});

//MODIFICAR EL TOSTRING A LA HORA DE LA RESPUESTA
UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );