import {
    ROL_VALIDO,
    ROL_NO_VALIDO,
} from '../types';

// Validar roles de los usuarios
export function validarRolAction(roleRequerido) {
    return (dispatch) => {
        var token = localStorage.getItem('token');
        console.log(roleRequerido);
        if (token !== null) {
            var usuarioBase64 = token.split('.')[1];
            usuarioBase64 = usuarioBase64.replace('-', '+').replace('_', '/');
            var response = JSON.parse(window.atob(usuarioBase64));
            console.log(response.user.role);
            if (response.user.role === roleRequerido) {
                dispatch(ValidarRol(response.user.role));
            } else {
                dispatch(NoValidarRol("No valido para acceder a la ruta"));
            }
        }
    }
}

const ValidarRol = rol => ({
    type: ROL_VALIDO,
    payload: rol,
})
const NoValidarRol = msj => ({
    type: ROL_NO_VALIDO,
    payload: msj,
})