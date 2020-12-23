const { Schema, model } = require('mongoose');

let generalCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'La denominacion es requerida'],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    }
}, { collection: 'generalCategories' });

generalCategorySchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('GeneralCategory', generalCategorySchema);