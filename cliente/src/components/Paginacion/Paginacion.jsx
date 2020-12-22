import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Paginacion.css';
import {
    obtenerUsuariosAction,
} from '../../actions/adminActions';
const Paginacion = () => {
    const numero_paginas = [];

    const dispatch = useDispatch();
    // consultar la api
    const cargarUsuarios = (indexPrimerUsuario) => dispatch(obtenerUsuariosAction(indexPrimerUsuario));

    const elementos_por_pagina_state = useSelector(state => state.admin.elementoPorPagina);
    const total_elementos_state = useSelector(state => state.admin.totalElementos);
    /* const desdeElemento_state = useSelector(state => state.admin.desdeElemento); */
    const paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);


    for (let i = 1; i < Math.ceil(total_elementos_state / elementos_por_pagina_state); i++) {
        numero_paginas.push(i);
    }

    //cambiar pagina
    const handlePage = (numero) => {
        console.log(numero);
        console.log(paginaCorriente_state);
        const indexUltimoElemento = numero * elementos_por_pagina_state;
        const indexPrimerElemento = indexUltimoElemento - elementos_por_pagina_state;
        console.log(indexPrimerElemento);
        cargarUsuarios(indexPrimerElemento);
    }

    return (
        <Fragment>
            <div className="center">
                <div className="paginacion" >
                    <button
                        to={'#'}
                    >&laquo;</button>
                    {numero_paginas.map(numero => (
                        <button
                            key={numero}
                            to={'#'}
                            className={(paginaCorriente_state === (numero + 1) ? 'active' : '')}
                            onClick={() => handlePage(numero)}
                        >{numero}</button>
                    ))}
                    <button to={'#'}>&raquo;</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Paginacion;
