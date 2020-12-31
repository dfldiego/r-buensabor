import {
    PAGINA_MENUES_FILTRADOS,
    ABRIR_DETALLE_MENU,
    CERRAR_DETALLE_MENU,
} from '../types';

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