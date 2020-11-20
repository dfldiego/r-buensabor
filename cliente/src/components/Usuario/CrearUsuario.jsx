import React, { Fragment } from 'react';
import './CrearUsuario.css';
// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarUsuarioAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

function CrearUsuario() {

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const dispatch = useDispatch();
    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarUsuarioAction(nuevo_estado));

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

    return (
        <Fragment>
            <div className="modal-usuario">
                <div className="modal-container-usuario">
                    <div className="form-container-usuario">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />
                        <form>
                            <div className="form-row">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="nombre"
                                />
                            </div>
                            <div className="form-row">
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    name="apellido"
                                />
                            </div>
                            <div className="form-row">
                                <label>Domicilio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Domicilio"
                                    name="domicilio"
                                />
                            </div>
                            <div className="form-row">
                                <label>Nro Domicilio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nro Domicilio"
                                    name="nro_domicilio"
                                />
                            </div>
                            <div className="form-row">
                                <label>Rol</label>
                                <select id="roles">
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
