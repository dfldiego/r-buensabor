import {
    ROL_VALIDO,
    ROL_NO_VALIDO,
} from '../types';

const initialState = {
    tieneRolRequerido: null,
    msj: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ROL_VALIDO:
            return {
                ...state,
                tieneRolRequerido: action.payload,
            }
        case ROL_NO_VALIDO:
            return {
                ...state,
                msj: action.payload,
            }
        default:
            return state;
    }
}

