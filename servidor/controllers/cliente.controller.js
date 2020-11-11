const { response } = require('express');
const Cliente = require('../models/cliente.model');

exports.crearCliente = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'crearCliente'
    });

}
exports.obtenerCliente = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obtenerCliente'
    });
}
exports.actualizarCliente = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarCliente'
    });
}
exports.eliminarCliente = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarCliente'
    });
}