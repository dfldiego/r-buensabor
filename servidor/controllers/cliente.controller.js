const { response } = require('express');
const Cliente = require('../models/cliente.model');

exports.crearCliente = async (req, res = response) => {
    // hacemos destructuring de los datos introducidos.
    const { persona } = req.body;

    try {

        // verificiamos si existe el departamento
        const existe_persona = await Cliente.findOne({ persona });
        if (existe_persona) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente ya existe en la BD'
            });
        }

        // si no existe, creamos un nuevo Cliente con los datos
        const cliente = new Cliente(req.body);

        // añadimos el nuevo cliente a la BD
        await cliente.save();

        res.json({
            ok: true,
            cliente
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        });
    }
}
exports.obtenerCliente = async (req, res = response) => {
    try {
        // obtenemos los deptos de la BD
        const cliente = await Cliente.find();

        res.json({
            ok: true,
            cliente
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en obtenerCliente'
        });
    }
}
exports.actualizarCliente = async (req, res = response) => {

    // obtenemos el id por parametro
    const id = req.params.id;

    try {
        // verificamos que el cliente con ese id exista en la BD
        const clienteDB = await Cliente.findById(id);
        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese id'
            });
        }

        // El cliente existe y queremos actualizarlo
        // destructuring al dato que actualizará el cliente
        const { persona, ...campos } = req.body;

        // verificamos que ese nombre de cliente no exista en la BD
        if (clienteDB.persona !== persona) {
            const existe_cliente = await Cliente.findOne({ persona });
            if (existe_cliente) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El cliente ya existe en la BD'
                });
            }
        }

        // debemos colocar el nombre de cliente que queremos actualizar
        campos.persona = persona;

        //actualizamos
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            clienteActualizado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado."
        });
    }
}
exports.eliminarCliente = async (req, res = response) => {

    //obtenemos el id pasado por parametro
    const id = req.params.id;

    try {

        // encontrar el Cliente con el id pasado por URL en la BD
        const clienteDB = await Cliente.findById(id);
        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese id'
            });
        }

        // borrar Cliente de la DB
        await Cliente.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Cliente Eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado..'
        });
    }
}