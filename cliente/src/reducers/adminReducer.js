import {
    ENTRAR_CRUD_USUARIOS,
    ABRIR_AGREGAR_USUARIOS,
    CERRAR_AGREGAR_USUARIOS,
} from '../types';

const initialState = {
    en_usuario: null,
    abrir_agregar_usuario: null,
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
            }
        default:
            return state;
    }
}