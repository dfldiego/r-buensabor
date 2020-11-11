const { response } = require('express');
const Empleado = require('../models/empleado.model');

exports.crearEmpleado = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'crearEmpleado'
    });

}
exports.obtenerEmpleado = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obtenerEmpleado'
    });
}
exports.actualizarEmpleado = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarEmpleado'
    });
}
exports.eliminarEmpleado = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarEmpleado'
    });
}