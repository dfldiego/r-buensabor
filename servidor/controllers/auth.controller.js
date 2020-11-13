const { response } = require('express');
const Cliente = require('../models/cliente.model');
const bcrypt = require('bcryptjs');

exports.loginCliente = async (req, res = response) => {

    // obtenemos los datos de la peticion 
    const { email_cliente, contrasena_cliente } = req.body;

    try {
        // comprobamos si existe un cliente con el email pasado por peticion
        const clienteDB = await Cliente.findOne({ email_cliente });
        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un cliente con ese email"
            });
        }

        // validamos que el password sea correcto
        const validPassword = bcrypt.compareSync(contrasena_cliente, clienteDB.contrasena_cliente);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña no es válida"
            });
        }

        // TOKEN

        //mostramos por pantalla
        res.json({
            ok: true,
            msg: "Login Correcto"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        });
    }
}