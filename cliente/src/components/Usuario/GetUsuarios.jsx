import React, { Fragment } from 'react';
import './GetUsuarios.css';

import Usuariodb from './Usuariodb';
import Paginacion from './Paginacion';

import { useSelector } from 'react-redux';

const GetUsuarios = () => {

    const usuarios_state = useSelector(state => state.admin.usuarios);
    const error = useSelector(state => state.admin.error);
    const mensaje_error = useSelector(state => state.admin.mensaje);

    return (
        <Fragment>
            <h2 className="titulo">Listado de Usuarios</h2>
            {
                error ? <p className="error">{mensaje_error}</p> : null
            }
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