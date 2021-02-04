const { Schema, model } = require('mongoose');

let menuDetailSchema = new Schema({
    quantity: {
        type: Number,
        required: [true, 'La cantidad es requerida'],
    },
    unit_measurement: {
        type: String,
        required: [true, 'La unidad de medida es requerida']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, { collection: 'menuDetail' });

menuDetailSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('MenuDetail', menuDetailSchema);