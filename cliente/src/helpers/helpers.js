const validarRol = async (roleRequerido) => {
    var token = localStorage.getItem('token');

    if (!token) {
        console.log('exit');
        return false;
    }

    console.log(token);
    console.log(roleRequerido);

    try {
        var usuarioBase64 = token.split('.')[1];
        usuarioBase64 = usuarioBase64.replace('-', '+').replace('_', '/');
        var response = await JSON.parse(window.atob(usuarioBase64));
        console.log(response.user.role);
        if (response.user.role === roleRequerido) {
            return true;
        } else {
            console.log("entra al false");
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    validarRol
}