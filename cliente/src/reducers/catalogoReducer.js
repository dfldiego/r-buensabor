import {
    PAGINA_MENUES_FILTRADOS,
    PAGINA_CATALOGO_INSUMOS_PADRES,
    ABRIR_DETALLE_MENU,
    CERRAR_DETALLE_MENU,
    OBTENER_MENU,
    OBTENER_MENU_ERROR,
    GUARDAR_CATEGORIA_INSUMO_PADRE,
    PAGINA_MENUES_INSUMO_FILTRADOS,
    OBTENER_INSUMO,
} from '../types';

const initialState = {
    en_pagina_menues_filtrados: false,
    en_pagina_menues_insumo_filtrados: false,
    en_pagina_catalogo_insumo_padres: false,
    abrir_detalle_menu: false,
    menu: null,
    ingredientes: [],
    error: false,
    errores: [],
    mensaje: "",
    categoria_insumo_padre: null,
    insumo_detalle: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PAGINA_MENUES_FILTRADOS:
            return {
                ...state,
                en_pagina_menues_filtrados: action.payload,
            }
        case PAGINA_MENUES_INSUMO_FILTRADOS:
            return {
                ...state,
                en_pagina_menues_insumo_filtrados: action.payload,
            }
        case PAGINA_CATALOGO_INSUMOS_PADRES:
            return {
                ...state,
                en_pagina_catalogo_insumo_padres: action.payload,
                menu: null,
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
                menu: null,
                insumo_detalle: null,
                ingredientes: [],
            }
        case OBTENER_MENU:
            return {
                ...state,
                menu: action.payload.menu,
                ingredientes: action.payload.ingredients,
            }
        case OBTENER_INSUMO:
            return {
                ...state,
                insumo_detalle: action.payload,
            }
        case OBTENER_MENU_ERROR:
            return {
                ...state,
                error: true,
                mensaje: action.payload,
                errores: [],
                menu: null,
            }
        case GUARDAR_CATEGORIA_INSUMO_PADRE:
            return {
                ...state,
                categoria_insumo_padre: action.payload,
            }
        default:
            return state;
    }
}