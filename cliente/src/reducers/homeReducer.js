import {
    ABRIR_MODAL,
    CERRAR_MODAL,
    ABRIR_REGISTRARSE,
} from '../types';

const initialState = {
    abrir_modal: false,
    abrir_registrarse: false,
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
            return {
                ...state,
                abrir_registrarse: action.payload
            }
        default:
            return state;
    }
}