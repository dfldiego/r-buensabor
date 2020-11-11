const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    denominacion_rol: {
        type: String,
        required: true,
        default: 'CLIENTE'
    }
}, { collection: 'roles' });

RolSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Rol', RolSchema);