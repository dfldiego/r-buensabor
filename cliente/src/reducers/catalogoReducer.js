import {
    PAGINA_MENUES_FILTRADOS,
    PAGINA_CATALOGO_INSUMOS_PADRES,
    ABRIR_DETALLE_MENU,
    CERRAR_DETALLE_MENU,
    OBTENER_MENU,
    OBTENER_MENU_ERROR,
} from '../types';

const initialState = {
    en_pagina_menues_filtrados: false,
    en_pagina_catalogo_insumo_padres: false,
    abrir_detalle_menu: false,
    menu: {},
    ingredientes: [],
    error: false,
    errores: [],
    mensaje: "",
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PAGINA_MENUES_FILTRADOS:
            return {
                ...state,
                en_pagina_menues_filtrados: action.payload,
            }
        case PAGINA_CATALOGO_INSUMOS_PADRES:
            return {
                ...state,
                en_pagina_catalogo_insumo_padres: action.payload,
            }
        case ABRIR_DETALLE_MENU:
            return {
                ...state,
                abrir_detalle_menu: action.payload,
            }
        case CERRAR_DETALLE_MENU:
            return {
                ...state,
                abrir_detalle_menu: action.payload,
                menu: {},
                ingredientes: [],
            }
        case OBTENER_MENU:
            return {
                ...state,
                menu: action.payload.menu,
                ingredientes: action.payload.ingredients,
            }
        case OBTENER_MENU_ERROR:
            return {
                ...state,
                error: true,
                mensaje: action.payload,
                errores: [],
            }
        default:
            return state;
    }
}