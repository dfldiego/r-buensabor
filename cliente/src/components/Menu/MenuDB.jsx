import React, { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    eliminarMenuAction,
    obtenerMenuAction,
} from '../../actions/adminActions';

import Swal from 'sweetalert2';

const MenuDB = ({ menu }) => {

    const { description, finished_time, price, category } = menu;

    const dispatch = useDispatch();

    const baja_menu = datos_menu => dispatch(eliminarMenuAction(datos_menu));
    const cargarmenus = () => dispatch(obtenerMenuAction());

    const recargarTablaMenu = useSelector(state => state.admin.menu_eliminar);

    /** USE EFFECT: cada vez que se modifica categorias */
    useEffect(() => {
        cargarmenus();

        // eslint-disable-next-line
    }, [recargarTablaMenu]);

    const handleClick_eliminar_menu = async datos_menu => {

        await Swal.fire({
            title: '¿Estás seguro?',
            text: "Un menu que se elimina, no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                baja_menu(datos_menu);
            }
        });

    }

    return (
        <Fragment>
            <tr>
                <td>{description}</td>
                <td>{finished_time}</td>
                <td>{price}</td>
                <td>{category.name}</td>
                <td>
                    <div className="acciones">
                        <button className="boton_editar">
                            Editar
                        </button>
                        <button
                            className="boton_borrar"
                            onClick={() => handleClick_eliminar_menu(menu)}
                        >Eliminar</button>
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default MenuDB
