import {
    PAGINA_MENUES_FILTRADOS,
    PAGINA_CATALOGO_INSUMOS_PADRES,
    ABRIR_DETALLE_MENU,
    CERRAR_DETALLE_MENU,
    OBTENER_MENU,
    GUARDAR_CATEGORIA_INSUMO_PADRE,
    PAGINA_MENUES_INSUMO_FILTRADOS,
    OBTENER_INSUMO,
} from '../types';

/**********************  para obtener el menu x id de la BBDD ********************************/
export function guardarMenuDetalleAction(menu) {
    return async (dispatch) => {
        dispatch(guardarMenu(menu))
    }
}

const guardarMenu = menu => ({
    type: OBTENER_MENU,
    payload: menu,
});

/**********************  para abrir modal de detalle de menu-insumo con datos del insumo ********************************/
export function guardarInsumoDetalleAction(insumo) {
    return (dispatch) => {
        dispatch(guardarInsumo(insumo));
    }
}

const guardarInsumo = insumo => ({
    type: OBTENER_INSUMO,
    payload: insumo
})

/**********************  para abrir modal de detalle de menu ********************************/
export function abrirCerrarDetalleMenuAction(estadoDetalleMenu) {
    return (dispatch) => {
        if (estadoDetalleMenu) {
            dispatch(abrirDetalleMenu(estadoDetalleMenu));
        } else {
            dispatch(cerrarDetalleMenu(estadoDetalleMenu));
        }
    }
}

const abrirDetalleMenu = estadoDetalleMenu => ({
    type: ABRIR_DETALLE_MENU,
    payload: estadoDetalleMenu
})

const cerrarDetalleMenu = estadoDetalleMenu => ({
    type: CERRAR_DETALLE_MENU,
    payload: estadoDetalleMenu
})

/**********************  para ingresar a pagina de menues insumos filtrados ********************************/
export function paginaMenuesInsumosFiltradosAction(estado) {
    return async (dispatch) => {
        dispatch(entradaPaginaMenuesInsumoFiltrados(estado))
    }
}

const entradaPaginaMenuesInsumoFiltrados = (estado) => ({
    type: PAGINA_MENUES_INSUMO_FILTRADOS,
    payload: estado,
})


/**********************  para ingresar a pagina de menues filtrados ********************************/
export function paginaMenuesFiltradosAction(estado) {
    return async (dispatch) => {
        dispatch(entradaPaginaMenuesFiltrados(estado))
    }
}

const entradaPaginaMenuesFiltrados = (estado) => ({
    type: PAGINA_MENUES_FILTRADOS,
    payload: estado,
})

export function guardarCategoriaInsumoPadreAction(categoriaInsumoPadre) {
    return async (dispatch) => {
        dispatch(guardarCategoriaInsumoPadreClickeado(categoriaInsumoPadre))
    }
}

/**********************  para ingresar a pagina de menues filtrados ********************************/
export function paginaCatalogoInsumoPadreAction(estado, categoriaInsumoPadre) {
    return async (dispatch) => {
        dispatch(entradaCatalogoInsumoPadre(estado))

        dispatch(guardarCategoriaInsumoPadreClickeado(categoriaInsumoPadre))
    }
}

const entradaCatalogoInsumoPadre = (estado) => ({
    type: PAGINA_CATALOGO_INSUMOS_PADRES,
    payload: estado,
})

const guardarCategoriaInsumoPadreClickeado = (categoriaInsumoPadre) => ({
    type: GUARDAR_CATEGORIA_INSUMO_PADRE,
    payload: categoriaInsumoPadre,
})