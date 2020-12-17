const desencriptarToken = async (token) => {
    var usuarioBase64 = token.split('.')[1];
    usuarioBase64 = usuarioBase64.replace('-', '+').replace('_', '/');
    var response = await JSON.parse(window.atob(usuarioBase64));
    return response;
}

module.exports = {
    desencriptarToken,
}