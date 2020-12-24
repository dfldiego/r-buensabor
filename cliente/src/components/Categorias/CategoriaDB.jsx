import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    eliminarCategoriaAction,
    obtenerCategoriasAction,
    obtenerCategoriaAction,
    abrirCerrarAgregarCategoriaAction,
} from '../../actions/adminActions';
import Swal from 'sweetalert2';

const CategoriaDB = ({ categoria }) => {

    const { name } = categoria;

    const dispatch = useDispatch();

    /** ENVIAR AL STORE **/
    const baja_categoria = datos_categoria => dispatch(eliminarCategoriaAction(datos_categoria));
    const cargarcategorias = () => dispatch(obtenerCategoriasAction());
    const abrir_cerrar_categoria = estadoEditarUsuario => dispatch(abrirCerrarAgregarCategoriaAction(estadoEditarUsuario));
    const obtener_categoria_editar = usuario => dispatch(obtenerCategoriaAction(usuario));
    /** OBTENER DEL STORE **/
    const recargarTablaCategoria = useSelector(state => state.admin.categoria_eliminar);

    /** USE EFFECT: cada vez que se modifica categorias */
    useEffect(() => {
        //llamar la funcion
        cargarcategorias();
        // eslint-disable-next-line
    }, [recargarTablaCategoria]);

    /** EVENTO DE ELIMINAR CATEGORIAS **/
    const handleClick_eliminar_categoria = async datos_categoria => {

        // pregustar a admin
        await Swal.fire({
            title: '¿Estás seguro?',
            text: "Una categoria que se elimina, no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                baja_categoria(datos_categoria);
            }
        });

    }

    /** EVENTO PARA EDITAR CATEGORIAS **/
    const handleClick_editar_categoria = categoria => {
        abrir_cerrar_categoria(true);
        obtener_categoria_editar(categoria);
    }

    return (
        <Fragment>
            <tr>
                <td>{name}</td>
                <td>
                    <div className="acciones">
                        <button
                            className="boton_editar"
                            onClick={() => handleClick_editar_categoria(categoria)}
                        >Editar
                        </button>
                        <button
                            className="boton_borrar"
                            onClick={() => handleClick_eliminar_categoria(categoria)}
                        >Eliminar</button>
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default CategoriaDB
