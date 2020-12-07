const { model, Schema } = require('mongoose');

const AddressModel = Schema({
    nameStreet: {
        type: String,
        required: [true],
    },
    numberStreet: {
        type: Number,
        required: [true],
    },
    location: {
        type: String,
        required: [true],
    },
    status: {
        type: Boolean,
        default: true
    },
});

AddressModel.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Address', AddressModel);