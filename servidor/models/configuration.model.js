const { Schema, model } = require('mongoose');

let configSchema = new Schema({
    quantityCooks: {
        type: Number,
        required: [true, 'La cantidad de cocineros es requerida'],
    },
    email: {
        type: String,
        required: [true, 'El email de la compañia es requerida'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña del email es requerida']
    },
});

configSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Configuration', configSchema);