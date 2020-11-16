import {
    ABRIR_MODAL,
    CERRAR_MODAL,
    ABRIR_REGISTRARSE,
    CERRAR_REGISTRARSE,
} from '../types';

const initialState = {
    abrir_modal: false,
    abrir_registrarse: false,
    esta_logueado: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ABRIR_MODAL:
        case CERRAR_MODAL:
            return {
                ...state,
                abrir_modal: action.payload
            }
        case ABRIR_REGISTRARSE:
        case CERRAR_REGISTRARSE:
            return {
                ...state,
                abrir_registrarse: action.payload
            }
        default:
            return state;
    }
}