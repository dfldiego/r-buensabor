import {
    ABRIR_MODAL,
} from '../types';

// aca es donde vamos a abrir el modal  
export function abrirModalAction(estado_modal) {
    return (dispatch) => {
        dispatch(abrirModal());

    }
}

const abrirModal = () => ({
    type: ABRIR_MODAL
})