const { Schema, model } = require('mongoose');

const menuSchema = Schema({
    description: {
        type: String,
        required: [true, 'La Denominacion es requerida'],
    },
    finished_time: {
        type: Number,
        required: [true, 'El tiempo estimado de cocina es requerido'],
    },
    price: {
        type: String,
        required: [true, 'El precio es requerido'],
    },
    status: {
        type: Boolean,
        default: true
    },
}, { collection: 'menu' });

menuSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

//implementar el modelo
module.exports = model('Menu', menuSchema);
