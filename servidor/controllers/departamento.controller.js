const { response } = require('express');
const Departamento = require('../models/departamento.model');

exports.CrearDepartamento = async (req, res = response) => {

    // hacemos destructuring de los datos introducidos.
    const { nombre_departamento } = req.body;

    try {

        // verificiamos si existe el departamento
        const existe_departamento = await Departamento.findOne({ nombre_departamento });
        if (existe_departamento) {
            return res.status(400).json({
                ok: false,
                msg: 'El departamento ya existe en la BD'
            });
        }

        // si no existe, creamos un nuevo Departamento con los datos
        const departamento = new Departamento(req.body);

        // añadimos el nuevo departamento a la BD
        await departamento.save();

        res.json({
            ok: true,
            departamento
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        });
    }
}

exports.obtenerDepartamento = async (req, res = response) => {
    try {
        // obtenemos los deptos de la BD
        const departamentos = await Departamento.find();

        res.json({
            ok: true,
            departamentos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en obtenerDepartamento'
        });
    }
}

exports.actualizarDepartamento = async (req, res = response) => {

    // obtenemos el id por parametro
    const id = req.params.id;

    try {
        // verificamos que el departamento con ese id exista en la BD
        const deptoDB = await Departamento.findById(id);
        if (!deptoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un departamento con ese id'
            });
        }

        // El depto existe y queremos actualizarlo
        // destructuring al dato que actualizará el depto
        const { nombre_departamento, ...campos } = req.body;

        // verificamos que ese nombre de departamento no exista en la BD
        if (deptoDB.nombre_departamento !== nombre_departamento) {
            const existe_departamento = await Departamento.findOne({ nombre_departamento });
            if (existe_departamento) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El departamento ya existe en la BD'
                });
            }
        }

        // debemos colocar el nombre de depto que queremos actualizar
        campos.nombre_departamento = nombre_departamento;

        //actualizamos
        const deptoActualizado = await Departamento.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            deptoActualizado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        });
    }
}

exports.eliminarDepartamento = async (req, res = response) => {

    //obtenemos el id pasado por parametro
    const id = req.params.id;

    try {

        // encontrar el departamento con el id pasado por URL en la BD
        const deptoDB = await Departamento.findById(id);

        //si el departamento buscado no existe
        if (!deptoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un departamento con ese id'
            });
        }

        // borrar departamento de la DB
        await Departamento.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Departamento Eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado..'
        });
    }
}