import React, { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    eliminarCategoriaInsumoAction,
    obtenerCategoriaInsumoAction,
    obtenerUnaCategoriaInsumoAction,
    abrirCerrarAgregarCategoriaInsumoAction,
} from '../../actions/adminActions';

import Swal from 'sweetalert2';

const InsumoCategoriaDB = ({ categoria }) => {

    const { description, parent, img } = categoria;

    const dispatch = useDispatch();

    const baja_categoria_insumos = datos_menu => dispatch(eliminarCategoriaInsumoAction(datos_menu));
    const cargarCategoriasInsumo = () => dispatch(obtenerCategoriaInsumoAction());
    const abrir_cerrar_categoria = estadoEditarCategoria => dispatch(abrirCerrarAgregarCategoriaInsumoAction(estadoEditarCategoria));
    const obtener_categoria_insumo_editar = datos_categoria_insumo => dispatch(obtenerUnaCategoriaInsumoAction(datos_categoria_insumo));

    const recargarTablaCategoriaInsumo = useSelector(state => state.admin.categoria_insumo_eliminar);
    const recargarTablaCategoriaInsumoAlEditar = useSelector(state => state.admin.categoria_insumo_editar);

    useEffect(() => {
        if (recargarTablaCategoriaInsumoAlEditar === null) {
            cargarCategoriasInsumo();
        }

        // eslint-disable-next-line
    }, [recargarTablaCategoriaInsumoAlEditar]);

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

    const handleClick_editar_categoria_insumo = categoriaInsumo => {
        abrir_cerrar_categoria(true);
        obtener_categoria_insumo_editar(categoriaInsumo);
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
                        <button className="boton_editar" onClick={() => handleClick_editar_categoria_insumo(categoria)}>
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
