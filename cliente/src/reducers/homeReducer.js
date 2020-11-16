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

const initialState = {
    abrir_modal: false,
    abrir_registrarse: false,
    esta_logueado: false,
    alerta: null,
    mensaje: '',
    usuarios: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ABRIR_MODAL:
        case CERRAR_MODAL:
            return {
                ...state,
                abrir_modal: action.payload,
                mensaje: '',
            }
        case ABRIR_REGISTRARSE:
        case CERRAR_REGISTRARSE:
            return {
                ...state,
                abrir_registrarse: action.payload,
                mensaje: '',
            }
        case REGISTRO_EXITOSO:
            return {
                ...state,
                alerta: null,
                mensaje: '',
                usuarios: [...state.usuarios, action.payload]
            }
        case REGISTRO_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                alerta: true,
            }
        default:
            return state;
    }
}