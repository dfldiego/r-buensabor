const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    persona: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Persona'
    }
}, { collection: 'clientes' });

ClienteSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Cliente', ClienteSchema);