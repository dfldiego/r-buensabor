import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Usuario/Paginacion.css';
import {
    obtenerInsumosAction,
} from '../../actions/adminActions';

const PaginacionInsumos = () => {

    const dispatch = useDispatch();

    const cargarInsumos = (indexPrimerInsumo, limit, paginaCorriente) => dispatch(obtenerInsumosAction(indexPrimerInsumo, limit, paginaCorriente));

    const total_elementos_state = useSelector(state => state.admin.totalElementos);
    const limite_state = useSelector(state => state.admin.limite);
    let paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);

    //cambiar pagina
    const handlePage = (numero) => {
        if (paginaCorriente_state === 0) {
            return;
        } else {
            paginaCorriente_state = numero;
            const indexPrimerElemento = numero;
            cargarInsumos(indexPrimerElemento, limite_state, paginaCorriente_state);
        }
    }

    const handlePage2 = (numero) => {
        if (numero < 0) {
            numero = 0;
            paginaCorriente_state = 0;
            return;
        } else if (numero > Math.floor(total_elementos_state / limite_state)) {
            paginaCorriente_state = Math.floor(total_elementos_state / limite_state)
            return;
        } else {
            paginaCorriente_state = numero;
            const indexPrimerElemento = numero * limite_state;
            cargarInsumos(indexPrimerElemento, limite_state, paginaCorriente_state);
        }

    }

    const handlePage3 = () => {
        if (paginaCorriente_state >= Math.floor(total_elementos_state / limite_state)) {
            paginaCorriente_state = Math.floor(total_elementos_state / limite_state);
            return;
        } else {
            paginaCorriente_state = Math.floor(total_elementos_state / limite_state);
            const indexPrimerElemento = paginaCorriente_state * limite_state;
            cargarInsumos(indexPrimerElemento, limite_state, paginaCorriente_state);
        }
    }

    return (
        <Fragment>
            <div className="center">
                <div className="paginacion" >
                    <button to={'#'} onClick={() => handlePage(0)}>&laquo;</button>
                    <button to={'#'} onClick={() => handlePage2(--paginaCorriente_state)}>&lt;</button>
                    <button to={'#'} onClick={() => handlePage2(++paginaCorriente_state)}>&gt;</button>
                    <button to={'#'} onClick={() => handlePage3()}>&raquo;</button>
                </div>
            </div>
        </Fragment>
    )
}

export default PaginacionInsumos
