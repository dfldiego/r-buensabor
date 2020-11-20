import React, { Fragment, useState } from 'react';
import './CrearUsuario.css';
import { useDispatch, useSelector } from 'react-redux';
// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarUsuarioAction,
    crearNuevoUsuarioAction,
} from '../../actions/adminActions';

function CrearUsuario() {

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        domicilio: '',
        nro_domicilio: 0,
        rol: '',
    });

    const { nombre, apellido, domicilio, nro_domicilio, rol } = usuario;

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

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_usuario);

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

        // validar campos vacios
        if (nombre === '' || apellido === '' || domicilio === '' || nro_domicilio <= 0 || rol === '') {
            return;
        }

        agregar_usuario_action({
            nombre,
            apellido,
            domicilio,
            nro_domicilio,
            rol,
        });
    }

    return (
        <Fragment>
            <div className="modal-usuario">
                <div className="modal-container-usuario">
                    <div className="form-container-usuario">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />
                        <form onSubmit={handleSubmitAgregarUsuario}>
                            <div className="form-row">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    name="apellido"
                                    value={apellido}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Domicilio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Domicilio"
                                    name="domicilio"
                                    value={domicilio}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Nro Domicilio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Nro Domicilio"
                                    name="nro_domicilio"
                                    value={nro_domicilio}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Rol</label>
                                <select
                                    name="rol"
                                    value={rol}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Seleccione un rol --</option>
                                    <option value="administrativo">Administrativo</option>
                                    <option value="cajero">Cajero</option>
                                    <option value="cocinero">Cocinero</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                            >Agregar</button>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default CrearUsuario
