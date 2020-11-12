const { response } = require('express');
const Rol = require('../models/rol.model');

exports.crearRol = async (req, res = response) => {

    const { denominacion_rol } = req.body;

    try {

        // verificamos si existe un rol con ese nombre
        const existeRol = await Rol.findOne({ denominacion_rol });
        if (existeRol) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un rol con ese nombre"
            });
        }

        // creamos una instancia de rol con los datos pasados por el body
        const rol = new Rol(req.body);

        //agregamos el nuevo rol a la BD
        await rol.save();

        res.json({
            ok: true,
            rol
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}
exports.obtenerRol = async (req, res = response) => {

    try {
        const roles = await Rol.find();

        res.json({
            ok: true,
            roles
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}
exports.actualizarRol = async (req, res = response) => {

    // obtenemos el id por parametro
    const id = req.params.id;

    try {
        // verificamos que el rol con ese id exista en la BD
        const rolDB = await Rol.findById(id);
        if (!rolDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un rol con ese id'
            });
        }

        // El rol con ese id existe y queremos actualizarlo
        // verificiamos si existe el rol en la BD
        const existe_rol = await Rol.findOne(req.body);
        if (existe_rol) {
            return res.status(400).json({
                ok: false,
                msg: 'El rol ya existe en la BD'
            });
        }

        //actualizamos
        const rolActualizado = await Rol.findByIdAndUpdate(id, req.body, { new: true });

        res.json({
            ok: true,
            rolActualizado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        });
    }
}
exports.eliminarRol = async (req, res = response) => {
    //obtenemos el id pasado por parametro
    const id = req.params.id;

    try {

        // encontrar el rol con el id pasado por URL en la BD
        const rolDB = await Rol.findById(id);

        //si el rol buscado no existe
        if (!rolDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un rol con ese id'
            });
        }

        // borrar rol de la DB
        await Rol.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Rol Eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado..'
        });
    }
}