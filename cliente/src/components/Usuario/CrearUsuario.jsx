import React, { Fragment, useEffect, useState } from 'react';
import './CrearUsuario.css';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarUsuarioAction,
    crearNuevoUsuarioAction,
    editarUsuarioAction,
    obtenerUsuariosBuscadorAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

function CrearUsuario() {

    const [usuario, setUsuario] = useState({
        name: '',
        email: '',
        password: '',
        telephoneNumber: 0,
        role: ''
    });

    const { name, email, password, telephoneNumber, role } = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }



    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const dispatch = useDispatch();
    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarUsuarioAction(nuevo_estado));
    const agregar_usuario_action = (datosNuevoUsuario) => dispatch(crearNuevoUsuarioAction(datosNuevoUsuario));
    const usuario_editar_action = (datosUsuario) => dispatch(editarUsuarioAction(datosUsuario));
    const cargarUsuarios = () => dispatch(obtenerUsuariosBuscadorAction());

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_usuario);
    let error_admin = useSelector(state => state.admin.error);
    let mensaje_admin = useSelector(state => state.admin.mensaje);
    let usuario_editar_store = useSelector(state => state.admin.usuario_editar);

    /***********METODO QUE CIERRA MODAL: modifico el state *************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    const handleSubmitAgregarUsuario = e => {
        e.preventDefault();

        // si apretamos boton editar
        if (usuario_editar_store) {
            // le pasamos al usuarioEditado el id del usuario original
            usuario._id = usuario_editar_store._id;
            // pasamos los datos del usuario editado al action
            usuario_editar_action(usuario);
            //cargamos los usuarios en la tabla
            cargarUsuarios();
            //finalmente, cerramos modal
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        } else {
            agregar_usuario_action(usuario);

            setUsuario({
                name: '',
                email: '',
                password: '',
                telephoneNumber: 0,
                role: ''
            })
        }
    }

    useEffect(() => {
        if (usuario_editar_store) {
            setUsuario({
                name: usuario_editar_store.name,
                email: usuario_editar_store.email,
                password: usuario_editar_store.password,
                telephoneNumber: usuario_editar_store.telephoneNumber,
                role: usuario_editar_store.role
            })
        }

        // eslint-disable-next-line
    }, [usuario_editar_store])

    return (
        <Fragment>
            <div className="modal-usuario">
                <div className="modal-container-usuario">
                    <div className="form-container-usuario">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />
                        {error_admin ? <p className="error">{mensaje_admin} </p> : null}
                        <form onSubmit={handleSubmitAgregarUsuario}>
                            <div className="form-row">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>
                            {
                                usuario_editar_store === null ?
                                    <div className="form-row">
                                        <label>Password</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    :
                                    null
                            }
                            <div className="form-row">
                                <label>Nro Telefono</label>
                                <input
                                    type="phone"
                                    className="form-control"
                                    placeholder="Nro Telefono"
                                    name="telephoneNumber"
                                    value={telephoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Rol</label>
                                <select
                                    name="role"
                                    className="form-control"
                                    value={role}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Seleccione un rol --</option>
                                    <option value="ADMIN_ROLE">Administrativo</option>
                                    <option value="CASHIER_ROLE">Cajero</option>
                                    <option value="CHEF_ROLE">Cocinero</option>
                                    <option value="USER_ROLE">Usuario</option>
                                </select>
                            </div>
                            {
                                usuario_editar_store ?
                                    <button
                                        type="submit"
                                    >Editar</button>
                                    :
                                    <button
                                        type="submit"
                                    >Agregar</button>
                            }

                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default CrearUsuario
