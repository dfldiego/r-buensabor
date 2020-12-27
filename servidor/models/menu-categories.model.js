const { Schema, model } = require('mongoose');

let MenuCategoriesSchema = new Schema({
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

MenuCategoriesSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('MenuCategories', MenuCategoriesSchema);
