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
import clienteAxios from '../config/axios';

//aca es donde vamos a loguear un usuario
export function loginAction(msj, datos) {
    return (dispatch) => {
        if (msj === '') {
            dispatch(loginUsuario(datos));
            dispatch(cerrarModal(false));
        } else {
            dispatch(loginUsuarioError(msj));
        }
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
    return async (dispatch) => {

        try {
            // insertarlo en la BD
            await clienteAxios.post('/api/register', datos)
            // si todo sale bien
            dispatch(registrarUsuario(datos));
        } catch (error) {
            console.log(error.response.data.msg);
            // si hay un error
            dispatch(registrarUsuarioError(String(error.response.data.msg)));
        }
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