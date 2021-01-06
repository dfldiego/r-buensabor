import {
    PAGINA_MENUES_FILTRADOS,
    ABRIR_DETALLE_MENU,
    CERRAR_DETALLE_MENU,
    OBTENER_MENU,
    OBTENER_MENU_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import { authorizationHeader } from '../helpers/authorization_header';

/**********************  para obtener el menu x id de la BBDD ********************************/
export function obtenerMenuPorIdAction(idMenu) {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/menu/${idMenu}`, header)
                .then(response => {
                    const { menu, ingredients } = response.data;
                    const datos = { menu, ingredients }
                    dispatch(descargarMenuExito(datos));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarMenusError('Error al descargar el menú'));
        }
    }
}

const descargarMenuExito = respuesta => ({
    type: OBTENER_MENU,
    payload: respuesta,
});

const descargarMenusError = errores => ({
    type: OBTENER_MENU_ERROR,
    payload: errores,
});

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