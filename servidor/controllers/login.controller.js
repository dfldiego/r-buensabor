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
                msg: err
            });
        }
        if (body.email.trim() === '' || body.password.trim() === '') {
            dispatch(loginUsuarioError('Todos los campos son obligatorios'));
            return;
        }
        // validamos el usuario
        if (!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'email o contraseña invalido'
                }
            });
        }

        // validamos el password
        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'email o contraseña invalido'
                }
            });
        }

        // si email y password es correcto
        // creamos el token. 
        // GENERAR UN TOKEN -- JWT


        // seteo tiempo de expiracion
        let fechaActual = new Date();
        //Date.setMinutes(minutos[, segundos, milisegundos]) : Establece los minutos 
        //Date.getMinutes(); : Obtiene los minutos, de 0 a 59
        console.log(fechaActual.getHours() + ':' + fechaActual.getMinutes()); // Hora actual
        fechaActual.setMinutes(fechaActual.getMinutes() + 1); // Añadiendo 360 minutos(6h) a la fecha actual
        console.log(fechaActual.getHours() + ':' + fechaActual.getMinutes());
        console.log(fechaActual);
        let dateExpiration = fechaActual;

        let datosToken = {
            user,
            dateExpiration
        }
        const token = await generateJWT(datosToken);

        res.json({
            ok: true,
            user,
            token,
        });
    });
};

const loginGoogle = async (req, res) => {

    // verificamos el token pasado
    let token = req.body.tokenId;
    // verificamos los datos de google. Si hay error -> salta un 403
    let googleUser = await googleVerify(token).catch(err => {
        return res.status(403).json({
            ok: false,
            msg: "Token no válido",
            err
        });
    });

    // buscamos en la BD un email con los datos del usuario de google
    User.findOne({ email: googleUser.email }, async (err, userDB) => {
        // si existe un usuario con ese email
        if (userDB) {
            // verificamos el estado del usuario. si no es de google mandamos un msj de error
            if (userDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        msg: 'Debes usar una autenticación normal'
                    },
                    err
                });
            }
            // si usuario es de google
            // GENERAR UN TOKEN -- JWT
            const token = await generateJWT(userDB);
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
        user.save(async (err, userStored) => {
            // si hay error
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msg: "Error al grabar usuario en la DB",
                    err
                });
            };

            // si no hay error 
            // GENERAR UN TOKEN -- JWT
            const token = await generateJWT(userStored);

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
    loginGoogle,
}