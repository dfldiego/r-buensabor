const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const googleVerify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    // creamos el payload del token
    const payload = ticket.getPayload();

    const { name, email, picture } = payload;
    console.log(name);
    console.log(email);
    console.log(picture);

    // retornamos un objeto con datos de google
    return { name, email, picture, google: true }
};

module.exports = {
    googleVerify
};