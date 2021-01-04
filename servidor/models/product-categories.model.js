const { Schema, model } = require('mongoose');

let ProductCategoriesSchema = new Schema({
    description: {
        type: String,
        required: [true, 'La denominación es requerida']
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "ProductCategories",
        required: false
    },
    img: {
        type: String,
        required: [false]
    },
    status: {
        type: Boolean,
        default: true
    }
}, { collection: 'productCategories' });

ProductCategoriesSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('ProductCategories', ProductCategoriesSchema);