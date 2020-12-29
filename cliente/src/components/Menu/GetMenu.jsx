import React, { Fragment, useEffect, useState } from 'react';
import './Menu.css';

import MenuDB from '../Menu/MenuDB';

import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerMenuAction,
} from '../../actions/adminActions';

const GetMenu = () => {

    const dispatch = useDispatch();

    const menus_state = useSelector(state => state.admin.menus);


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
