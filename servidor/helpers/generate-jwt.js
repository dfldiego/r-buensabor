const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        // payload: no grabar info sensible
        const payload = {
            uid
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