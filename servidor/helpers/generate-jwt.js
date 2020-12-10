const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        // payload: no grabar info sensible
        const payload = {
            user: uid
        }

        // firma: payload,llave secreta, duracion del token, callback
        jwt.sign(payload, process.env.SEED, {
            expiresIn: '24h'
        }, (err, token) => {

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
    generateJWT
}