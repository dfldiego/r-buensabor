const response = require('express');
const Configuration = require('../models/configuration.model');

const list = async (req, res = response) => {

    try {
        const config = await Configuration.findOne();

        res.json({
            ok: true,
            config,
            total,
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

    let body = req.body;

    let config = new Configuration({
        quantityCooks: body.quantityCooks,
        email: body.email,
        password: body.password
    });

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

module.exports = {
    list,
    create,
    update,
}