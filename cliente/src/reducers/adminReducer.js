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
    OBTENER_USUARIO_ELIMINAR,
    USUARIO_ELIMINADO_EXITO,
    USUARIO_ELIMINADO_ERROR,
    OBTENER_USUARIO_EDITAR,
    USUARIO_EDITADO_EXITO,
    USUARIO_EDITADO_ERROR,
} from '../types';

const initialState = {
    en_usuario: null,
    loading: false,
    abrir_agregar_usuario: null,
    usuarios: [],
    error: null,
    mensaje: null,
    usuario_eliminar: null,
    usuario_editar: null,
    mostrarUsuarios: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ENTRAR_CRUD_USUARIOS:
            return {
                ...state,
                en_usuario: true,
            }
        case CERRAR_AGREGAR_USUARIOS:
            return {
                ...state,
                abrir_agregar_usuario: action.payload,
                mensaje: null,
                error: null,
                usuario_eliminar: null,
                usuario_editar: null,
            }
        case ABRIR_AGREGAR_USUARIOS:
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
        case USUARIO_ELIMINADO_ERROR:
        case USUARIO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                mensaje: action.payload,
                usuario_eliminar: null,
            }
        case DESCARGA_USUARIOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                usuarios: action.payload,
                mostrarUsuarios: true,
            }
        case OBTENER_USUARIO_ELIMINAR:
            return {
                ...state,
                usuario_eliminar: action.payload
            }
        case OBTENER_USUARIO_EDITAR:
            return {
                ...state,
                usuario_editar: action.payload,
            }
        case USUARIO_ELIMINADO_EXITO:
            return {
                ...state,
                usuario_eliminar: null,
                usuarios: state.usuarios.map(usuario =>
                    usuario._id === action.payload._id ?
                        usuario = action.payload
                        :
                        usuario
                )
            }
        case USUARIO_EDITADO_EXITO:
            return {
                ...state,
                usuarios: state.usuarios.map(usuario =>
                    usuario._id === action.payload._id ?
                        usuario = action.payload
                        :
                        usuario
                ),
                usuario_editar: null,
            }
        default:
            return state;
    }
}