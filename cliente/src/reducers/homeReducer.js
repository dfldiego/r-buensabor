import {
    ABRIR_MODAL,
    CERRAR_MODAL,
    ABRIR_REGISTRARSE,
    CERRAR_REGISTRARSE,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    ESTA_LOGUEADO,
    NO_ESTA_LOGUEADO,
    CERRAR_SESION,
    ROL_USUARIO,
    ABRIR_PERFIL,
    CERRAR_PERFIL,
    ACTUALIZADO_PERFIL,
    ACTUALIZADO_PERFIL_ERROR,
} from '../types';

const initialState = {
    abrir_modal: false,
    abrir_registrarse: false,
    esta_logueado: false,
    alerta: null,
    mensaje: '',
    token: null,
    rol: null,
    abrir_modal_perfil: false,
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
                abrir_registrarse: false,
            }
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                alerta: true,
            }
        case LOGIN_EXITOSO:
            return {
                ...state,
                alerta: null,
                mensaje: '',
                esta_logueado: true,
                abrir_modal: false,
            }
        case ESTA_LOGUEADO:
            return {
                ...state,
                token: action.payload,
                esta_logueado: true,
            }
        case NO_ESTA_LOGUEADO:
        case CERRAR_SESION:
            return {
                ...state,
                token: action.payload,
                esta_logueado: false,
                rol: null,
            }
        case ROL_USUARIO:
            return {
                ...state,
                rol: action.payload
            }
        case ABRIR_PERFIL:
            return {
                ...state,
                abrir_modal_perfil: true,
            }
        case CERRAR_PERFIL:
            return {
                ...state,
                abrir_modal_perfil: false,
            }
        default:
            return state;
    }
}