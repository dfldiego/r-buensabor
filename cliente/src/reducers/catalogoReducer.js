import {
    PAGINA_MENUES_FILTRADOS,
    ABRIR_DETALLE_MENU,
    CERRAR_DETALLE_MENU,
} from '../types';

const initialState = {
    en_pagina_menues_filtrados: false,
    abrir_detalle_menu: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PAGINA_MENUES_FILTRADOS:
            return {
                ...state,
                en_pagina_menues_filtrados: action.payload,
            }
        case ABRIR_DETALLE_MENU:
        case CERRAR_DETALLE_MENU:
            return {
                ...state,
                abrir_detalle_menu: action.payload,
            }
        default:
            return state;
    }
}