import React, { Fragment, useEffect } from 'react';
import './GetUsuarios.css';
import Usuariodb from './Usuariodb';

import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerUsuariosAction,
} from '../../actions/adminActions';

const GetUsuarios = () => {

    const dispatch = useDispatch();

    /* const cargando = useSelector(state => state.admin.loading); */
    const usuarios_state = useSelector(state => state.admin.usuarios);

    useEffect(() => {
        // consultar la api
        const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
        //llamar la funcion
        cargarUsuarios();
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
        </Fragment>
    )
}

export default GetUsuarios;