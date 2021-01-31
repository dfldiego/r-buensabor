const { Schema, model } = require('mongoose');

let orderDetailSchema = new Schema({
    quantity: {
        type: Number,
        required: [true, 'La cantidad es requerida']
    },
    subTotal: {
        type: Number,
        required: [true, 'El subtotal es requerido'],
    },
    status: {
        type: Boolean,
        default: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: false
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
}, { collection: 'orderDetail' });

orderDetailSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('OrderDetail', orderDetailSchema);