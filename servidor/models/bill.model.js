const { Schema, model } = require('mongoose');

let payments = {
    values: ['DEBIT', 'CREDIT', 'CASH'],
    message: '{VALUE} is not a valid payment type'
};

let billSchema = new Schema({
    date: {
        type: String,
        required: [true, 'La fecha es requerida']
    },
    number: {
        type: String,
        required: [true, 'El numero de orden es requerido'],
    },
    discount: {
        type: Number,
        required: [true, 'El monto de descuento es requerido']
    },
    total: {
        type: Number,
        required: [true, 'El total es requerido']
    },
    paymentType: {
        type: String,
        default: 'CASH',
        enum: payments,
    },
    nroCard: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
});

billSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Bill', billSchema);