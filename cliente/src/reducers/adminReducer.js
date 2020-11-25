import {
    ENTRAR_CRUD_USUARIOS,
    ABRIR_AGREGAR_USUARIOS,
    CERRAR_AGREGAR_USUARIOS,
    AGREGAR_USUARIO,
    AGREGAR_USUARIO_EXITO,
    AGREGAR_USUARIO_ERROR,
    COMENZAR_DESCARGA_USUARIOS,
    DESCARGA_USUARIOS_EXITO,
    DESCARGA_USUARIOS_ERROR,
} from '../types';

const initialState = {
    en_usuario: null,
    loading: false,
    abrir_agregar_usuario: null,
    usuarios: [],
    error: null,
    mensaje: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ENTRAR_CRUD_USUARIOS:
            return {
                ...state,
                en_usuario: true,
            }
        case ABRIR_AGREGAR_USUARIOS:
        case CERRAR_AGREGAR_USUARIOS:
            return {
                ...state,
                abrir_agregar_usuario: action.payload,
                mensaje: null,
                error: null,
            }
        case COMENZAR_DESCARGA_USUARIOS:
        case AGREGAR_USUARIO:
            return {
                ...state,
                loading: action.payload,
                error: null,
                mensaje: null,
            }
        case AGREGAR_USUARIO_EXITO:
            return {
                ...state,
                loading: false,
                usuarios: [...state.usuarios, action.payload],
                mensaje: null,
                error: false,
                abrir_agregar_usuario: null,
            }
        case AGREGAR_USUARIO_ERROR:
        case DESCARGA_USUARIOS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                mensaje: action.payload,
            }
        case DESCARGA_USUARIOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                usuarios: action.payload,
            }
        default:
            return state;
    }
}