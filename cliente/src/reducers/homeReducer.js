import {
    ABRIR_MODAL,
    CERRAR_MODAL,
} from '../types';

const initialState = {
    abrir_modal: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ABRIR_MODAL:
            return {
                ...state,
                abrir_modal: action.payload
            }
        case CERRAR_MODAL:
            return {
                ...state,
                abrir_modal: action.payload
            }
        default:
            return state;
    }
}