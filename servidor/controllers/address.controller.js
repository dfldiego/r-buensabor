const { response } = require('express');
const Address = require('../models/address.model');

const list = async (req, res = response) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 10;

    try {
        const addresses = await Address.find({ status: true })
            .skip(from)
            .limit(limit);
        Address.countDocuments({ status: true });

        res.json({
            ok: true,
            addresses
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const create = async (req, res = response) => {
    const { nameStreet, numberStreet, location } = req.body;

    try {

        if (nameStreet.trim() === '' || numberStreet <= 0 || location.trim() === '') {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }

        // crear una instancia del nuevo Address
        const address = new Address(req.body);


        // guardar user en la BD
        await address.save();

        res.json({
            ok: true,
            address
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const update = async (req, res = response) => {

    // obtenemos el id por parametro
    const id = req.params.id;

    try {
        // verificamos que el address con ese id exista en la BD
        const addressDB = await Address.findById(id);
        if (!addressDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un domicilio con ese ID'
            });
        }

        // El usuario existe y queremos actualizarlo
        // destructuring al dato que actualizará el usuario
        const { nameStreet, numberStreet, location, ...campos } = req.body;

        // verificamos que el nameStreet del usuario no exista en la BD
        if (addressDB.nameStreet === nameStreet && addressDB.numberStreet === numberStreet && addressDB.location === location) {
            const existe_address = await Address.findOne({ nameStreet, numberStreet, location });
            if (existe_address) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El domicilio ya existe en la DB'
                });
            }
        }

        // debemos colocar el nombre de user que queremos actualizar
        campos.nameStreet = nameStreet;
        campos.numberStreet = numberStreet;
        campos.location = location;

        //actualizamos
        const addressStored = await Address.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            addressStored,
            msj: "Domicilio Eliminado"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const remove = async (req, res = response) => {

    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    Address.findByIdAndUpdate(id, changeStatus, { new: true }, (err, addressDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!addressDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Direccion no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            user: addressDeleted
        });
    });
}

module.exports = {
    list,
    create,
    update,
    remove,
}