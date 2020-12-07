export const validarRol = (roleRequerido) => {
    var token = localStorage.getItem('token');
    console.log(roleRequerido);
    if (token !== null) {
        var usuarioBase64 = token.split('.')[1];
        usuarioBase64 = usuarioBase64.replace('-', '+').replace('_', '/');
        var response = JSON.parse(window.atob(usuarioBase64));
        console.log(response.user.role);
        if (response.user.role === roleRequerido) {
            return true;
        } else {
            return false;
        }
    }
}