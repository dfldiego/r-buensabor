import React, { Fragment, useEffect } from 'react';
import './GetUsuarios.css';
import UsuarioDB from './usuarioDB';

import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerUsuariosAction,
} from '../../actions/adminActions';

const GetUsuarios = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // consultar la api
        const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
        //llamar la funcion
        cargarUsuarios();
    }, []);

    const usuarios_state = useSelector(state => state.admin.usuarios);
    console.log(usuarios_state);


    return (
        <Fragment>
            <h2 className="titulo">Listado de Usuarios</h2>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Domicilio</th>
                        <th scope="col">Nro. Domicilio</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios_state.length === 0 ? 'No hay usuarios' :
                            usuarios_state.map((usuario) => (
                                <UsuarioDB
                                    key={usuario.id}
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