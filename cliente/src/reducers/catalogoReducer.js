import {
    PAGINA_MENUES_FILTRADOS,
} from '../types';

const initialState = {
    en_pagina_menues_filtrados: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PAGINA_MENUES_FILTRADOS:
            return {
                ...state,
                en_pagina_menues_filtrados: action.payload,
            }
        default:
            return state;
    }
}