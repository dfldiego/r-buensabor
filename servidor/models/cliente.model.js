const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre_cliente: {
        type: String,
        required: true
    },
    apellido_cliente: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    telefono_cliente: {
        type: String,
        required: true
    },
    imagen_cliente: {
        type: String
    },
    email_cliente: {
        type: String,
        required: true,
        unique: true
    },
    contrasena_cliente: {
        type: String,
        required: true
    },
    domicilio: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Domicilio',
    },
}, { collection: 'clientes' });

ClienteSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Cliente', ClienteSchema);