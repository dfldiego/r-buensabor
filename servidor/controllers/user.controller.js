const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const list = async (req, res = response) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 10;

    try {
        const users = await User.find({ status: true })
            .populate('address', 'nameStreet numberStreet location')
            .skip(from)
            .limit(limit);
        User.countDocuments({ status: true });

        res.json({
            ok: true,
            users
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
    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "ese email ya se encuentra registrado"
            });
        }
        if (email.trim() === '' || password.trim() === '') {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                ok: false,
                msg: "El password debe ser de al menos 6 caracteres"
            });
        }

        // crear una instancia del nuevo User
        const user = new User(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // guardar user en la BD
        await user.save();

        res.json({
            ok: true,
            user
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
        // verificamos que el user con ese id exista en la BD
        const userDB = await User.findById(id);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }

        // El usuario existe y queremos actualizarlo
        // destructuring al dato que actualizará el usuario
        const { email, password, ...campos } = req.body;

        // verificamos que el email del usuario no exista en la BD
        if (userDB.email !== email) {
            const existe_user = await User.findOne({ email });
            if (existe_user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario ya existe en la DB'
                });
            }
        }

        // debemos colocar el nombre de user que queremos actualizar
        campos.email = email;

        //actualizamos
        const userStored = await User.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            userStored
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

    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });
    });
}

const getById = async (req, res = response) => {
    let userId = req.params.id;

    User.findById(userId)
        .populate('address', 'nameStreet numberStreet location')
        .exec((err, user) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                user,
            });
        });
};

module.exports = {
    list,
    create,
    getById,
    update,
    remove,
}