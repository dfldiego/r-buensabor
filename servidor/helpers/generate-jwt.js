const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    console.log("uid", uid);
    console.log("uid.dateExpiration", uid.dateExpiration);
    return new Promise((resolve, reject) => {
        // payload: no grabar info sensible
        const payload = {
            user: uid.user,
            dateExpiration: uid.dateExpiration
        }
        console.log("payload", payload);
        // firma: payload,llave secreta, duracion del token, callback
        jwt.sign(payload, process.env.SEED, { expiresIn: '6h' }, (err, token) => {
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