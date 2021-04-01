const validarRol = async (roleRequerido) => {
    var token = localStorage.getItem('token');

    if (!token) {
        return false;
    }
    try {
        var usuarioBase64 = token.split('.')[1];
        usuarioBase64 = usuarioBase64.replace('-', '+').replace('_', '/');
        var response = await JSON.parse(window.atob(usuarioBase64));
       /*  console.log("response", response);
        console.log("response.user", response.user); */
        if (response.user.role === roleRequerido) {
            return true;
        } else {
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

