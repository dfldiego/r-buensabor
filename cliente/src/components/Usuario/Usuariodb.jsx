import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    eliminarUsuarioAction,
    obtenerUsuariosAction,
} from '../../actions/adminActions';
import Swal from 'sweetalert2';

const Usuariodb = ({ usuario }) => {
    const { name, email, telephoneNumber, role } = usuario;

    const dispatch = useDispatch();
    /** ENVIAR AL STORE **/
    const baja_usuario = datos_usuario => dispatch(eliminarUsuarioAction(datos_usuario));
    // consultar la api
    const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
    /** OBTENER DEL STORE **/
    let usuario_eliminado_state = useSelector(state => state.admin.usuario_eliminar);

    /** USE EFFECT: cada vez que se modifica usuarios */
    useEffect(() => {
        //llamar la funcion
        cargarUsuarios();

        // eslint-disable-next-line
    }, [usuario_eliminado_state]);

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
