const { response } = require('express');
const Persona = require('../models/persona.model');

exports.crearPersona = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'crearPersona'
    });

}
exports.obtenerPersona = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obtenerPersona'
    });
}
exports.actualizarPersona = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarPersona'
    });
}
exports.eliminarPersona = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarPersona'
    });
}