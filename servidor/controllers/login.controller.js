const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { googleVerify } = require('../helpers/google-verify');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res) => {
    let body = req.body;

    // buscar en la BD un user que coincida con el email pasado por cliente.
    await User.findOne({ email: body.email }, async (err, user) => {
        // validamos si hay un error en el servidor.
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // validamos el usuario
        if (!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'email o contraseña invalido'
                }
            });
        }

        // validamos el password
        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'email o contraseña invalido'
                }
            });
        }

        // si email y password es correcto
        // creamos el token. 
        // GENERAR UN TOKEN -- JWT
        const token = await generateJWT(user._id);

        res.json({
            ok: true,
            user,
            token
        });
    });
};

const loginGoogle = async (req, res) => {

    // verificamos el token pasado
    let token = req.body.idtoken;
    console.log(token);
    // verificamos los datos de google. Si hay error -> salta un 403
    let googleUser = await googleVerify(token).catch(err => {
        return res.status(403).json({
            ok: false,
            msg: "Token no válido",
            err
        });
    });

    // buscamos en la BD un email con los datos del usuario de google
    await User.findOne({ email: googleUser.email }, async (err, userDB) => {

        // si existe un usuario con ese email
        if (userDB) {
            // verificamos el estado del usuario. si no es de google mandamos un msj de error
            if (userDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Debes usar una autenticación normal'
                    }
                });
            }

            // si usuario es de google
            // GENERAR UN TOKEN -- JWT
            const token = await generateJWT(userDB.id);

            return res.json({
                ok: true,
                user: userDB,
                token,
            });
        }

        // si no existe un usuario con ese email en la BD
        // lo creamos un usuario con los datos de google.
        // google no nos pasa el pass, pero le agregamos algo por defecto.
        let user = new User({
            name: googleUser.name,
            email: googleUser.email,
            img: googleUser.picture,
            google: googleUser.google,
            password: '###',
        });

        // guardamos el usuario en la BD
        await user.save(async (err, userStored) => {
            // si hay error
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            // si no hay error 
            // GENERAR UN TOKEN -- JWT
            const token = await generateJWT(userStored.id);

            return res.json({
                ok: true,
                user: userStored,
                token,
            });
        });
    });
};

module.exports = {
    login,
    loginGoogle
}