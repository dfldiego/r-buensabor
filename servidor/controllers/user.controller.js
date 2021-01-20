const { response } = require('express');
const User = require('../models/user.model');
const Address = require('../models/address.model');
const bcrypt = require('bcryptjs');


/* const list = async (req, res = response) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    try {
        const [users, total] = await Promise.all([
            User.find({ status: true })
                .populate('address', 'nameStreet numberStreet location')
                .skip(from)
                .limit(limit),
            User.countDocuments({ status: true })
        ]);

        res.json({
            ok: true,
            users,
            total,
            limit,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
} */

const create = async (req, res = response) => {

    const { email, password } = req.body;

    try {

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

        const existeEmail = await User.findOne({ email });
        if (existeEmail) {
            if (existeEmail.status === true) {
                return res.status(400).json({
                    ok: false,
                    msg: "ese email ya se encuentra registrado"
                });
            } else {
                const user = new User(req.body);
                user._id = existeEmail._id;
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(password, salt);

                const userStored = await User.findByIdAndUpdate(user._id, user, { new: true });

                return res.json({
                    ok: true,
                    msg: "usuario dado de alta nuevamente",
                    userStored
                });
            }
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
        const { email, password, new_password, new_password_repeat, nameStreet, numberStreet, location, ...campos } = req.body;

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

        if (new_password && new_password_repeat && password) {
            // verificamos passwords
            const validPassword = bcrypt.compareSync(password, userDB.password);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'password no válido'
                });
            } else {
                if (new_password === new_password_repeat) {
                    //hashear el nuevo password
                    const salt = bcrypt.genSaltSync();
                    //modifico el password del usuario
                    campos.password = bcrypt.hashSync(new_password, salt);
                } else {
                    return res.status(400).json({
                        ok: false,
                        msg: "contraseña nueva y repetir nueva contraseña no coinciden"
                    });
                }
            }
        }

        //actualizamos
        const userStored = await User.findByIdAndUpdate(id, campos, { new: true });

        const camposAddress = {};
        // actualizar Address del usuario
        camposAddress.location = location;
        camposAddress.nameStreet = nameStreet;
        camposAddress.numberStreet = numberStreet;
        const addressStored = await Address.findByIdAndUpdate(userDB.address, camposAddress, { new: true });

        res.json({
            ok: true,
            userStored,
            addressStored
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
                    msg: 'Usuario no encontrado'
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

const search = async (req, res) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    let search = req.params.words;
    let regExWords = new RegExp(search, 'i');

    let conditionSearch = {
        status: true
    }

    if (search != 'undefined') {
        conditionSearch = {
            $or: [{ name: regExWords }, { email: regExWords }, { role: regExWords }],
            status: true
        }
    }

    try {
        const [users, total] = await Promise.all([
            User.find(conditionSearch)
                .populate('address', 'nameStreet numberStreet location')
                .skip(from)
                .limit(limit),
            User.countDocuments(conditionSearch)
        ]);

        res.json({
            ok: true,
            users,
            total,
            limit,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error
        });
    }
};

module.exports = {
    /* list, */
    create,
    getById,
    update,
    remove,
    search
}