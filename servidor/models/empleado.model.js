const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
    persona: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Persona'
    },
    dni_empleado: {
        type: Number,
        required: true
    },
    fecha_ingreso: {
        type: Date,
        required: true
    }
}, { collection: 'clientes' });

EmpleadoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Empleado', EmpleadoSchema);