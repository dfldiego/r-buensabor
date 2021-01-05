import React, { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    eliminarCategoriaInsumoAction,
    obtenerCategoriaInsumoAction,
} from '../../actions/adminActions';

import Swal from 'sweetalert2';

const InsumoCategoriaDB = ({ categoria }) => {

    const { description, parent, img } = categoria;

    const dispatch = useDispatch();

    const baja_categoria_insumos = datos_menu => dispatch(eliminarCategoriaInsumoAction(datos_menu));
    const cargarCategoriasInsumo = () => dispatch(obtenerCategoriaInsumoAction());

    const recargarTablaCategoriaInsumo = useSelector(state => state.admin.categoria_insumo_eliminar);

    /** USE EFFECT: cada vez que se modifica categorias */
    useEffect(() => {
        cargarCategoriasInsumo();

        // eslint-disable-next-line
    }, [recargarTablaCategoriaInsumo]);

    const handleClick_eliminar_categoria_insumo = async datos_categoria_insumos => {

        await Swal.fire({
            title: '¿Estás seguro?',
            text: "Una categoria de insumo que se elimina, no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                baja_categoria_insumos(datos_categoria_insumos);
            }
        });

    }

    return (
        <Fragment>
            <tr>
                <td>{description}</td>
                <td>{img}</td>
                {
                    parent ?
                        <td>{parent.description}</td>
                        :
                        <td>{null}</td>
                }
                <td>
                    <div className="acciones">
                        <button className="boton_editar">
                            Editar
                        </button>
                        <button
                            type="button"
                            className="boton_borrar"
                            onClick={() => handleClick_eliminar_categoria_insumo(categoria)}
                        >Eliminar</button>
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default InsumoCategoriaDB;
