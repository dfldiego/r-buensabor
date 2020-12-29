import React, { Fragment, useEffect } from 'react';
import './Menu.css';

import MenuDB from '../Menu/MenuDB';

import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerMenuAction,
} from '../../actions/adminActions';

const GetMenu = () => {

    const dispatch = useDispatch();

    const menus_state = useSelector(state => state.admin.menus);
    const error = useSelector(state => state.admin.error);
    const mensaje_error = useSelector(state => state.admin.mensaje);

    useEffect(() => {

        const cargarMenus = () => dispatch(obtenerMenuAction());
        cargarMenus();
        // eslint-disable-next-line
    }, []);

    if (!menus_state) {
        return;
    }

    return (
        <Fragment>
            <h2 className="titulo">Listado de Menus</h2>
            {
                error ? <p className="error">{mensaje_error}</p> : null
            }
            <table>
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tiempo Estimado</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menus_state.length === 0 ? <tr><td>No hay menus</td></tr> :
                            menus_state.map(menu => (
                                <MenuDB
                                    key={menu._id}
                                    menu={menu}
                                />
                            ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default GetMenu
