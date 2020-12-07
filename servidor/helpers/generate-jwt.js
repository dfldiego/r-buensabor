const jwt = require('jsonwebtoken');

const generateJWT = (user) => {

    return new Promise((resolve, reject) => {
        // payload: no grabar info sensible
        const payload = {
            user
        }

        // firma: payload,llave secreta, duracion del token, callback
        jwt.sign(
            payload,
            process.env.SEED,
            { expiresIn: process.env.EXP_TOKEN },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el JWT');
                } else {
                    resolve(token);
                }
            });
    });
}

module.exports = {
    generateJWT,
}