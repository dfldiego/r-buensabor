import React, { Fragment } from 'react';
import './Menu.css';

import MenuDB from '../Menu/MenuDB';
import PaginacionMenu from './PaginacionMenu';

import { useSelector } from 'react-redux';

const GetMenu = () => {

    const menus_state = useSelector(state => state.admin.menus);
    const error = useSelector(state => state.admin.error);
    const mensaje_error = useSelector(state => state.admin.mensaje);

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
            <PaginacionMenu />
        </Fragment>
    )
}

export default GetMenu
