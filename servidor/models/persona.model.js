const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    nombre_persona: {
        type: String,
        required: true
    },
    apellido_persona: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    telefono_persona: {
        type: String,
        required: true
    },
    imagen_persona: {
        type: String,
        required: true
    },
    email_persona: {
        type: String,
        required: true,
        unique: true,
    },
    contrasena_persona: {
        type: String,
        required: true,
    },
    domicilio: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Domicilio',
    },
    rol: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Rol'
    }
}, { collection: 'personas' });

PersonaSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Persona', PersonaSchema);