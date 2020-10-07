import {
    ABRIR_MODAL,
    CERRAR_MODAL,
    ABRIR_REGISTRARSE,
    CERRAR_REGISTRARSE,
} from '../types';

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

/********* ABRIR REGISTRARSE ********/
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