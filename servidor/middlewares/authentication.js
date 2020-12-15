const jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    // le paso a token -> el valor del header Authorization
    let token = req.get('Authorization');
    // podemos validar si existe el token. 

    // metodo verify.(verificar el token)
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid token'
                }
            });
        }

        // si el token es válido
        // le pasamos los datos decodificados del token al objeto user.
        req.user = decoded.user;

        // salir de la funcion e ir a la siguiente.
        next();
    });
};

let checkAdminRole = (req, res, next) => {
    let user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        return;
    }

    res.status(401).json({
        ok: false,
        err: {
            message: 'The user is not admin'
        }
    });
};

module.exports = {
    checkToken,
    checkAdminRole
}