const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roles = {
    values: ['ADMIN_ROLE', 'SUPER_ADMIN_ROLE', 'USER_ROLE', 'CASHIER_ROLE', 'CHEF_ROLE'],
    message: '{VALUE} is not a valid role'
};

const UserSchema = Schema({
    name: {
        type: String,
        required: [false]
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido'],
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String,
        required: [false]
    },
    telephoneNumber: {
        type: Number,
        required: [false]
    },
    address: {
        type: Schema.Types.ObjectId,
        required: [false],
        ref: 'Address'
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
}, { collection: 'users' });

UserSchema.plugin(uniqueValidator, {
    message: '{PATH} could be unique'
});

UserSchema.method('toJSON', function () {
    const { __v, password, ...object } = this.toObject();
    return object;
})

module.exports = model('User', UserSchema);