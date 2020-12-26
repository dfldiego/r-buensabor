const { Schema, model } = require('mongoose');

let CategoriesMenuSchema = new Schema({
    name: {
        type: String,
        required: [true, 'La denominacion es requerida'],
        unique: true,
    },
    img: {
        type: String,
        required: [false]
    },
    status: {
        type: Boolean,
        default: true
    }
}, { collection: 'menuCategories' });

CategoriesMenuSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('CategoriesMenu', CategoriesMenuSchema);
