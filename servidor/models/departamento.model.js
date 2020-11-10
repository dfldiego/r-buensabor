const { Schema, model } = require('mongoose');

const DepartamentoSchema = Schema({
    nombre_departamento: {
        type: String,
        required: true
    }
}, { collection: 'departamentos' });

DepartamentoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('departamento', DepartamentoSchema);