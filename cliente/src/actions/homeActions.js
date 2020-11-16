import {
    ABRIR_MODAL,
    CERRAR_MODAL,
    ABRIR_REGISTRARSE,
    CERRAR_REGISTRARSE,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
} from '../types';

//aca es donde vamos a loguear un usuario
export function loginAction(msj, datos) {
    return (dispatch) => {
        if (msj === '') {
            dispatch(loginUsuario(datos));
        }
        dispatch(loginUsuarioError(msj));
    }
}

const loginUsuario = datos => ({
    type: LOGIN_EXITOSO,
    payload: datos
})

const loginUsuarioError = msj => ({
    type: LOGIN_ERROR,
    payload: msj
})

//aca es donde vamos a registrar un usuario
export function registrarAction(datos) {
    return (dispatch) => {

        const { email, password } = datos;

        // validar formulario
        if (email.trim() === '' || password.trim() === '') {
            dispatch(registrarUsuarioError('Todos los campos son obligatorios'));
            return;
        }
        if (password.length < 6) {
            dispatch(registrarUsuarioError('El password debe ser de al menos 6 caracteres'));
            return;
        }

        dispatch(registrarUsuario(datos));
    }
}

const registrarUsuario = datos => ({
    type: REGISTRO_EXITOSO,
    payload: datos,
})

const registrarUsuarioError = msj => ({
    type: REGISTRO_ERROR,
    payload: msj
})


// aca es donde vamos a abrir el modal  
export function abrirCerrarModalAction(estado_modal) {
    return (dispatch) => {
        if (estado_modal) {
            dispatch(abrirModal(estado_modal));
        } else {
            dispatch(cerrarModal(estado_modal));
        }
    }
}

const abrirModal = estado_modal => ({
    type: ABRIR_MODAL,
    payload: estado_modal
})

const cerrarModal = estado_modal => ({
    type: CERRAR_MODAL,
    payload: estado_modal
})

/********* ABRIR/CERRAR REGISTRARSE ********/
export function abrirRegistrarseAction(estado_registrate) {
    return (dispatch) => {
        if (estado_registrate) {
            dispatch(abrirRegistrarse(estado_registrate));
        } else {
            dispatch(cerrarRegistrarse(estado_registrate));
        }
    }
}

const abrirRegistrarse = estado_registrate => ({
    type: ABRIR_REGISTRARSE,
    payload: estado_registrate
})

const cerrarRegistrarse = estado_registrate => ({
    type: CERRAR_REGISTRARSE,
    payload: estado_registrate
})