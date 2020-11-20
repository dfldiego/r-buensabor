import {
    ENTRAR_CRUD_USUARIOS,
    ABRIR_AGREGAR_USUARIOS,
    CERRAR_AGREGAR_USUARIOS,
} from '../types';

// abrir modal agregar usuarios
export function abrirCerrarAgregarUsuarioAction(estadoAgregarUsuario) {
    return (dispatch) => {
        if (estadoAgregarUsuario) {
            dispatch(abrirAgregarUsuario(estadoAgregarUsuario));
        } else {
            dispatch(cerrarAgregarUsuario(estadoAgregarUsuario));
        }
    }
}

const abrirAgregarUsuario = estadoAgregarUsuario => ({
    type: ABRIR_AGREGAR_USUARIOS,
    payload: estadoAgregarUsuario
})

const cerrarAgregarUsuario = estadoAgregarUsuario => ({
    type: CERRAR_AGREGAR_USUARIOS,
    payload: estadoAgregarUsuario
})

// aqui es donde vamos a abrir usuario
export function usuarioAction(estadoNuevo) {
    return (dispatch) => {
        dispatch(modificarEstadoUsuario(estadoNuevo))
    }
}

const modificarEstadoUsuario = estadoNuevo => ({
    type: ENTRAR_CRUD_USUARIOS,
    payload: estadoNuevo
})