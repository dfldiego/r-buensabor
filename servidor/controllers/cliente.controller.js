const { response } = require('express');
const Cliente = require('../models/cliente.model');
const bcrypt = require('bcryptjs');

exports.crearCliente = async (req, res = response) => {
    const { email_cliente, contrasena_cliente } = req.body;

    try {

        const existeEmail = await Cliente.findOne({ email_cliente });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "Ya Existe un email con ese nombre"
            });
        }

        // crear una instancia del nuevo Cliente
        const cliente = new Cliente(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        cliente.contrasena_cliente = bcrypt.hashSync(contrasena_cliente, salt);

        // guardar cliente en la BD
        await cliente.save();

        res.json({
            ok: true,
            cliente
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}
exports.obtenerCliente = async (req, res = response) => {
    try {
        const clientes = await Cliente.find()
            .populate('Domicilio', 'calle_domicilio numero_domicilio');

        res.json({
            ok: true,
            clientes
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error inesperado"
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
        const { email_cliente, ...campos } = req.body;

        // verificamos que el email del cliente no exista en la BD
        if (clienteDB.email_cliente !== email_cliente) {
            const existe_cliente = await Cliente.findOne({ email_cliente });
            if (existe_cliente) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El cliente ya existe en la BD'
                });
            }
        }

        // debemos colocar el nombre de cliente que queremos actualizar
        campos.email_cliente = email_cliente;

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