const { Schema, model } = require('mongoose');

const menuSchema = Schema({
    description: {
        type: String,
        required: [true, 'La Denominacion es requerida'],
        unique: true,
    },
    finished_time: {
        type: Number,
        required: [true, 'El tiempo estimado de cocina es requerido'],
    },
    price: {
        type: String,
        required: [true, 'El precio es requerido'],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'GeneralCategory',
        required: true
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

module.exports = model('Menu', menuSchema);
