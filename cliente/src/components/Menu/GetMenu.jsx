import React, { Fragment, useEffect } from 'react';
import './Menu.css';

import MenuDB from '../Menu/MenuDB';
import PaginacionMenu from './PaginacionMenu';

import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerIngredientesAction,
} from '../../actions/adminActions';

const GetMenu = () => {

    const dispatch = useDispatch();

    const obtenerIngredientes = () => dispatch(obtenerIngredientesAction());

    const menus_state = useSelector(state => state.admin.menus);
    const IngredientesDB = useSelector(state => state.admin.ingredientes_menu_detalle);
    const menus = useSelector(state => state.admin.menus);

    useEffect(() => {
        obtenerIngredientes();

        // eslint-disable-next-line
    }, [menus])

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
                                    IngredientesDB={IngredientesDB}
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
