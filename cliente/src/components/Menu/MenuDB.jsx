import React, { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    eliminarMenuAction,
    obtenerMenuAction,
    obtenerUnMenuAction,
    abrirCerrarAgregarMenuAction,
} from '../../actions/adminActions';

import Swal from 'sweetalert2';

const MenuDB = ({ menu }) => {

    const { description, finished_time, price, category } = menu;

    const dispatch = useDispatch();

    const baja_menu = datos_menu => dispatch(eliminarMenuAction(datos_menu));
    const cargarmenus = () => dispatch(obtenerMenuAction());
    const abrir_cerrar_menu = estadoEditarMenu => dispatch(abrirCerrarAgregarMenuAction(estadoEditarMenu));
    const obtener_menu_editar = datos_menu => dispatch(obtenerUnMenuAction(datos_menu));

    const recargarTablaMenu = useSelector(state => state.admin.menu_eliminar);
    const recargarTablaMenuAlEditar = useSelector(state => state.admin.menu_editar);

    useEffect(() => {
        if (recargarTablaMenuAlEditar === null) {
            cargarmenus();
        }

        // eslint-disable-next-line
    }, [recargarTablaMenuAlEditar])

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

    const handleClick_editar_menu = menu => {
        abrir_cerrar_menu(true);
        obtener_menu_editar(menu);
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
                        <button
                            className="boton_editar"
                            onClick={() => handleClick_editar_menu(menu)}
                        >Editar
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
