const { response } = require('express');
const Rol = require('../models/rol.model');

exports.crearRol = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'crearRol'
    });

}
exports.obtenerRol = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obtenerRol'
    });
}
exports.actualizarRol = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarRol'
    });
}
exports.eliminarRol = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarRol'
    });
}