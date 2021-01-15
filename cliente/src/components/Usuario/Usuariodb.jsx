import React, { Fragment } from 'react';

import { useDispatch } from 'react-redux';
import {
    eliminarUsuarioAction,
    abrirCerrarAgregarUsuarioAction,
    obtenerUsuarioAction,
} from '../../actions/adminActions';

import Swal from 'sweetalert2';

const Usuariodb = ({ usuario }) => {

    const { name, email, telephoneNumber, role } = usuario;

    const dispatch = useDispatch();
    /** ENVIAR AL STORE **/
    const baja_usuario = datos_usuario => dispatch(eliminarUsuarioAction(datos_usuario));
    const abrir_cerrar_usuario = estadoEditarUsuario => dispatch(abrirCerrarAgregarUsuarioAction(estadoEditarUsuario));
    const obtener_usuario_editar = usuario => dispatch(obtenerUsuarioAction(usuario));

    /** EVENTO DE ELIMINAR USUARIO **/
    const handleClick_eliminar_usuario = async datos_usuario => {

        // pregustar al usuario
        await Swal.fire({
            title: '¿Estás seguro?',
            text: "Un usuario que se elimina, no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                baja_usuario(datos_usuario);
            }
        });

    }

    /** EVENTO PARA EDITAR USUARIO **/
    const handleClick_editar_usuario = usuario => {
        abrir_cerrar_usuario(true);
        obtener_usuario_editar(usuario);
    }
    return (
        <Fragment>
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{telephoneNumber}</td>
                <td>{role}</td>
                <td>
                    <div className="acciones">
                        <button
                            className="boton_editar"
                            onClick={() => handleClick_editar_usuario(usuario)}
                        >
                            Editar
                        </button>
                        <button
                            className="boton_borrar"
                            onClick={() => handleClick_eliminar_usuario(usuario)}
                        >Eliminar</button>
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default Usuariodb;
