const { Schema, model } = require('mongoose');

const DomicilioSchema = Schema({
    calle_domicilio: {
        type: String,
        required: true
    },
    numero_domicilio: {
        type: String,
        required: true
    },
    piso_domicilio: {
        type: String
    },
    numero_departamento: {
        type: String
    },
    id_departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    }
}, { collection: 'domicilios' });

DomicilioSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Domicilio', DomicilioSchema);