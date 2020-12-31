import {
    PAGINA_MENUES_FILTRADOS,
} from '../types';

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