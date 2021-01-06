const { Schema, model } = require('mongoose');

let productSchema = new Schema({
    description: {
        type: String,
        required: [true, 'La denominacion es requerida'],
        unique: true,
    },
    purchase_price: {
        type: Number,
        required: [true, 'El precio de compra es requerido'],
    },
    sale_price: {
        type: Number,
        required: [true, 'El precio de venta es requerido']
    },
    current_stock: {
        type: Number,
        default: 0,
        required: [true, 'El stock actual es requerido']
    },
    min_stock: {
        type: Number,
        default: 0,
        required: [true, 'El stock mínimo es requerido']
    },
    unit_measurement: {
        type: String,
        required: [true, 'La unidad de medida es requerida']
    },
    is_supplies: {
        type: Boolean,
        default: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategories',
        required: false,
    },
    status: {
        type: Boolean,
        default: true
    }
}, { collection: 'product' });

productSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Product', productSchema);