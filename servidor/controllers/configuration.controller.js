const response = require('express');
const Configuration = require('../models/configuration.model');
const bcrypt = require('bcryptjs');

const list = async (req, res = response) => {

    try {
        const config = await Configuration.findOne();

        res.json({
            ok: true,
            config,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
};

const create = async (req, res = response) => {

    const { quantityCooks, email, password } = req.body;

    let config = new Configuration({
        quantityCooks,
        email,
        password
    });

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    config.password = bcrypt.hashSync(password, salt);

    config.save((err, configStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            config: configStored
        });
    });
};

const update = async (req, res = response) => {

    let id = req.params.id;
    let body = req.body;

    Configuration.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, configStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            config: configStored
        });
    });
};

const remove = async (req, res = response) => {
    let id = req.params.id;

    try {

        const configDB = await Configuration.findById(id);

        if (!configDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un registro de configuracion con ese id'
            });
        }

        // borrar usuario de la DB
        await Configuration.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Registro de Configuracion Eliminada'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

module.exports = {
    list,
    create,
    update,
    remove,
}