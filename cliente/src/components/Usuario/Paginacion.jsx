import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Paginacion.css';
import {
    obtenerUsuariosBuscadorAction,
} from '../../actions/adminActions';
const Paginacion = () => {

    const dispatch = useDispatch();

    const cargarUsuarios = (indexPrimerUsuario, limit, paginaCorriente, palabraBuscar) => dispatch(obtenerUsuariosBuscadorAction(indexPrimerUsuario, limit, paginaCorriente, palabraBuscar));

    const total_elementos_state = useSelector(state => state.admin.totalElementos);
    const limite_state = useSelector(state => state.admin.limite);
    let desde_state = useSelector(state => state.admin.desde);
    let paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);
    let palabraBuscar_state = useSelector(state => state.admin.palabraBuscar);

    //cambiar pagina
    const handlePage = (numero) => {
        if (paginaCorriente_state === 0) {
            return;
        } else {
            paginaCorriente_state = numero;
            const indexPrimerElemento = numero;
            cargarUsuarios(indexPrimerElemento, limite_state, paginaCorriente_state, palabraBuscar_state);
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
            desde_state = numero * limite_state;
            cargarUsuarios(desde_state, limite_state, paginaCorriente_state, palabraBuscar_state);
        }

    }

    const handlePage3 = () => {
        if (paginaCorriente_state >= Math.floor(total_elementos_state / limite_state)) {
            paginaCorriente_state = Math.floor(total_elementos_state / limite_state);
            return;
        } else {
            paginaCorriente_state = Math.floor(total_elementos_state / limite_state);
            const indexPrimerElemento = paginaCorriente_state * limite_state;
            cargarUsuarios(indexPrimerElemento, limite_state, paginaCorriente_state, palabraBuscar_state);
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

export default Paginacion;
