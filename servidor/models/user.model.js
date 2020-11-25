const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roles = {
    values: ['ADMIN_ROLE', 'SUPER_ADMIN_ROLE', 'USER_ROLE', 'CASHIER_ROLE', 'CHEF_ROLE'],
    message: '{VALUE} is not a valid role'
};

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required'],
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String,
        required: [false]
    },
    telephoneNumber: {
        type: Number,
        required: [true, 'The Telephone number is required']
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