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
    ABRIR_CARRITO,
    CERRAR_CARRITO,
    AGREGAR_CARRITO,
    AGREGAR_CARRITO_EXITO,
    AGREGAR_CARRITO_ERROR,
    OBTENER_PRODUCTO_CARRITO_ELIMINAR,
    PRODUCTO_CARRITO_ELIMINADO_EXITO,
    ELIMINAR_PRODUCTO_CARRITO_ERROR,
    OBTENER_PRODUCTO_CARRITO,
    AGREGAR_ORDEN,
    AGREGAR_ORDEN_EXITO,
    AGREGAR_ORDEN_ERROR,
} from '../types';

const initialState = {
    abrir_modal: false,
    abrir_registrarse: false,
    esta_logueado: false,
    abrir_modal_carrito: false,
    alerta: null,
    mensaje: null,
    error: null,
    loading: false,
    token: null,
    rol: null,
    abrir_modal_perfil: false,
    perfil: null,
    carrito: [],
    ordenes: [],
    producto_carrito_eliminar: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case AGREGAR_ORDEN_EXITO:
            return {
                ...state,
                loading: false,
                ordenes: [...state.ordenes, action.payload],
                errores: [],
                mensaje: null,
                alerta: null,
                error: null,
                carrito: [],
                abrir_modal_carrito: false,
            }
        case AGREGAR_ORDEN:
            return {
                ...state,
                loading: action.payload,
            }
        case OBTENER_PRODUCTO_CARRITO:
            return {
                ...state,
                carrito: action.payload,
            }
        case PRODUCTO_CARRITO_ELIMINADO_EXITO:
            return {
                ...state,
                producto_carrito_eliminar: null,
                carrito: action.payload,
            }
        case OBTENER_PRODUCTO_CARRITO_ELIMINAR:
            return {
                ...state,
                producto_carrito_eliminar: action.payload,
            }
        case AGREGAR_CARRITO_EXITO:
            return {
                ...state,
                carrito: [...state.carrito, action.payload],
            }
        case AGREGAR_CARRITO:
            return {
                ...state,
                loading: action.payload,
            }
        case ABRIR_CARRITO:
        case CERRAR_CARRITO:
            return {
                ...state,
                abrir_modal_carrito: action.payload,
                mensaje: null,
                alerta: null,
            }
        case ABRIR_MODAL:
        case CERRAR_MODAL:
            return {
                ...state,
                abrir_modal: action.payload,
                mensaje: null,
                alerta: null,
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
        case ACTUALIZADO_PERFIL_ERROR:
        case AGREGAR_CARRITO_ERROR:
        case ELIMINAR_PRODUCTO_CARRITO_ERROR:
        case AGREGAR_ORDEN_ERROR:
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
                carrito: [],
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
                perfil: null,
                carrito: [],
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
                perfil: action.payload,
            }
        case CERRAR_PERFIL:
            return {
                ...state,
                abrir_modal_perfil: false,
            }
        case ACTUALIZADO_PERFIL:
            return {
                ...state,
                abrir_modal_perfil: false,
                perfil: null,
            }
        default:
            return state;
    }
}