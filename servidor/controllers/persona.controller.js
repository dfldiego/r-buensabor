const { response } = require('express');
const Persona = require('../models/persona.model');

exports.crearPersona = async (req, res = response) => {

    const { email_persona } = req.body;

    try {

        const existeEmail = await Persona.findOne({ email_persona });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "Ya Existe un email con ese nombre"
            });
        }

        const persona = new Persona(req.body);

        await persona.save();

        res.json({
            ok: true,
            persona
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}
exports.obtenerPersona = async (req, res = response) => {

    try {
        const personas = await Persona.find()
            .populate('Domicilio', 'calle_domicilio numero_domicilio');

        res.json({
            ok: true,
            personas
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}
exports.actualizarPersona = async (req, res = response) => {

    const id = req.params.id;

    try {
        const personaDB = await Persona.findById(id);
        if (!personaDB) {
            return res.status(404).json({
                ok: false,
                msg: "No se encuentra una persona con ese id"
            });
        }

        const { email_persona, ...campos } = req.body;

        // verificamos que ese email no exista en la BD
        if (personaDB.email_persona !== email_persona) {
            const existeEmail = await Persona.findOne({ email_persona });
            if (existeEmail) {
                return res.status(400).json({
                    ok: true,
                    msg: "Ya existe una persona con ese email"
                });
            }
        }

        campos.email_persona = email_persona;
        const personaActualizada = await Persona.findById(id, campos, { new: true });

        res.json({
            ok: true,
            personaActualizada
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}
exports.eliminarPersona = async (req, res = response) => {
    //obtenemos el id pasado por parametro
    const id = req.params.id;

    try {

        // encontrar el departamento con el id pasado por URL en la BD
        const personaDB = await Persona.findById(id);

        //si el departamento buscado no existe
        if (!personaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una persona con ese id'
            });
        }

        // borrar departamento de la DB
        await Persona.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Persona Eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado..'
        });
    }
}