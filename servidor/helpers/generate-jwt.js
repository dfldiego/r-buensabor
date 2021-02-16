const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        // payload: no grabar info sensible
        const payload = {
            user: uid
        }

        // firma: payload,llave secreta, duracion del token, callback
        jwt.sign(payload, process.env.SEED, {
            expiresIn: '30m'
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

const signRefreshToken = (uid) => {

    return new Promise((resolve, reject) => {
        // payload: no grabar info sensible
        const payload = {
            user: uid
        }

        // firma: payload,llave secreta, duracion del token, callback
        jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1m' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo refrestar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}

const verifyRefreshToken = (refreshToken) => {

    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                console.log(err);
                reject('No se pudo refrestar el JWT. No autorizado');
            }
            //  signRefreshToken -> payload.user
            const user = payload.user;
            resolve(user);
        });
    });
}

module.exports = {
    generateJWT,
    signRefreshToken,
    verifyRefreshToken,
}