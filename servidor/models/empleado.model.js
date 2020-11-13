const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
    nombre_empleado: {
        type: String,
        required: true
    },
    apellido_empleado: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    telefono_empleado: {
        type: String,
        required: true
    },
    imagen_empleado: {
        type: String
    },
    email_empleado: {
        type: String,
        required: true,
        unique: true
    },
    contrasena_empleado: {
        type: String,
        required: true
    },
    domicilio: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Domicilio',
    },
    rol: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Rol',
    },
    dni_empleado: {
        type: Number,
        required: true
    },
    fecha_ingreso: {
        type: Date,
        required: true
    }
}, { collection: 'empleados' });

EmpleadoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Empleado', EmpleadoSchema);