import {
    ENTRAR_CRUD_USUARIOS
} from '../types';

const initialState = {
    en_usuario: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ENTRAR_CRUD_USUARIOS:
            return {
                ...state,
                en_usuario: true,
            }
        default:
            return state;
    }
}