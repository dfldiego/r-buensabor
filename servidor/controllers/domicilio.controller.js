const { response } = require('express');
const Domicilio = require('../models/domicilio.model');

exports.CrearDomicilio = async (req, res = response) => {
    // hacemos destructuring de los datos introducidos.
    const { calle_domicilio, numero_domicilio, piso_domicilio, numero_departamento, id_departamento } = req.body;

    try {

        // verificiamos si existe el domicilio
        const existe_domicilio = await Domicilio.findOne({ calle_domicilio, numero_domicilio, piso_domicilio, numero_departamento, id_departamento });
        if (existe_domicilio) {
            return res.status(400).json({
                ok: false,
                msg: 'El domicilio ya existe en la BD'
            });
        }

        // si no existe, creamos un nuevo Departamento con los datos
        const domicilio = new Domicilio(req.body);

        // añadimos el nuevo departamento a la BD
        await domicilio.save();

        res.json({
            ok: true,
            domicilio
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        });
    }
    res.json({
        ok: true,
        msg: 'CrearDomicilio'
    });
}

exports.obtenerDomicilio = async (req, res = response) => {
    try {
        // obtenemos los deptos de la BD
        const domicilios = await Domicilio.find();

        res.json({
            ok: true,
            domicilios
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en obtenerDomicilio'
        });
    }
}

exports.actualizarDomicilio = async (req, res = response) => {

    // obtenemos el id por parametro
    const id = req.params.id;

    try {
        // verificamos que el domicilio con ese id exista en la BD
        const domicilioDB = await Domicilio.findById(id);
        if (!domicilioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un domicilio con ese id'
            });
        }

        // El domicilio con ese id existe y queremos actualizarlo
        // verificiamos si existe el domicilio en la BD
        const existe_domicilio = await Domicilio.findOne(req.body);
        if (existe_domicilio) {
            return res.status(400).json({
                ok: false,
                msg: 'El domicilio ya existe en la BD'
            });
        }

        //actualizamos
        const domicilioActualizado = await Domicilio.findByIdAndUpdate(id, req.body, { new: true });

        res.json({
            ok: true,
            domicilioActualizado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        });
    }
}

exports.eliminarDomicilio = async (req, res = response) => {
    //obtenemos el id pasado por parametro
    const id = req.params.id;

    try {

        // encontrar el departamento con el id pasado por URL en la BD
        const domicilioDB = await Domicilio.findById(id);

        //si el departamento buscado no existe
        if (!domicilioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un domicilio con ese id'
            });
        }

        // borrar departamento de la DB
        await Domicilio.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Domicilio Eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado..'
        });
    }
}