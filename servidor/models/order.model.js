const { Schema, model } = require('mongoose');

let status = {
    values: ['PENDIENTE', 'APROBADO', 'EN_PROGRESO', 'TERMINADO', 'FACTURADO', 'EN_DELIVERY'],
    message: '{VALUE} no es un estado de orden válida'
};

let orderSchema = new Schema({
    orderDate: {
        type: String,
        required: [true, 'La fecha de orden es requerida']
    },
    endDate: {
        type: String,
        required: [true, 'Hora estimada fin es requerida']
    },
    number: {
        type: Number,
        required: [true, 'El número de orden es requerida'],
    },
    status: {
        type: String,
        default: 'PENDIENTE',
        enum: status
    },
    shippingType: {
        type: Number,
        required: [true, 'El tipo de envío es requerido']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderDetail',
        required: false
    }]
}, { collection: 'order' });

orderSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Order', orderSchema);