import React, { Fragment, useEffect } from 'react';
import './GetUsuarios.css';
import Usuariodb from './Usuariodb';
import Paginacion from '../Paginacion/Paginacion';

import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerUsuariosAction,
} from '../../actions/adminActions';

const GetUsuarios = () => {
    const dispatch = useDispatch();


    const usuarios_state = useSelector(state => state.admin.usuarios);
    const elementos_por_pagina_state = useSelector(state => state.admin.elementoPorPagina);
    const total_elementos_state = useSelector(state => state.admin.totalElementos);
    const desdeElemento_state = useSelector(state => state.admin.desdeElemento);
    const paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);



    useEffect(() => {
        const indexUltimoUsuario = paginaCorriente_state * elementos_por_pagina_state;
        const indexPrimerUsuario = indexUltimoUsuario - elementos_por_pagina_state;
        // consultar la api
        const cargarUsuarios = (indexPrimerUsuario) => dispatch(obtenerUsuariosAction(indexPrimerUsuario));
        //llamar la funcion
        cargarUsuarios(indexPrimerUsuario);

        // eslint-disable-next-line
    }, []);




    return (
        <Fragment>
            <h2 className="titulo">Listado de Usuarios</h2>
            {usuarios_state.length === 0 ? <p className="error">No hay usuarios</p> : null}
            <table>
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Nro. Teléfono</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios_state.length === 0 ? null :
                            usuarios_state.map((usuario) => (
                                <Usuariodb
                                    key={usuario.email}
                                    usuario={usuario}
                                />
                            ))
                    }
                </tbody>
            </table>
            <Paginacion />
        </Fragment>
    )
}

export default GetUsuarios;