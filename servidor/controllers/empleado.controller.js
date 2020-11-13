const { response } = require('express');
const Empleado = require('../models/empleado.model');
const bcrypt = require('bcryptjs');

exports.crearEmpleado = async (req, res = response) => {
    const { email_empleado, contrasena_empleado } = req.body;
    console.log(req.body);
    try {

        const existeEmail = await Empleado.findOne({ email_empleado });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "Ya Existe un email con ese nombre"
            });
        }

        // crear una instancia del nuevo Cliente
        const empleado = new Empleado(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        empleado.contrasena_empleado = bcrypt.hashSync(contrasena_empleado, salt);

        // guardar cliente en la BD
        await empleado.save();

        res.json({
            ok: true,
            empleado
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error inesperado"
        });
    }

}
exports.obtenerEmpleado = async (req, res = response) => {
    try {
        const empleados = await Empleado.find()
            .populate('Domicilio', 'calle_domicilio numero_domicilio');

        res.json({
            ok: true,
            empleados
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}
exports.actualizarEmpleado = async (req, res = response) => {
    // obtenemos el id por parametro
    const id = req.params.id;

    try {
        // verificamos que el empleado con ese id exista en la BD
        const empleadoDB = await Empleado.findById(id);
        if (!empleadoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con ese id'
            });
        }

        // El empleado existe y queremos actualizarlo
        // destructuring al dato que actualizará el empleado
        const { email_empleado, ...campos } = req.body;

        // verificamos que el email del empleado no exista en la BD
        if (empleadoDB.email_empleado !== email_empleado) {
            const existe_empleado = await Empleado.findOne({ email_empleado });
            if (existe_empleado) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El empleado ya existe en la BD'
                });
            }
        }

        // debemos colocar el nombre de empleado que queremos actualizar
        campos.email_empleado = email_empleado;

        //actualizamos
        const empleadoActualizado = await Empleado.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            empleadoActualizado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        });
    }
}
exports.eliminarEmpleado = async (req, res = response) => {
    //obtenemos el id pasado por parametro
    const id = req.params.id;

    try {

        // encontrar el empleado con el id pasado por URL en la BD
        const empleadoDB = await Empleado.findById(id);
        if (!empleadoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con ese id'
            });
        }

        // borrar empleado de la DB
        await Empleado.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Empleado Eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado..'
        });
    }
}