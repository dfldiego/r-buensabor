import React, { Fragment } from 'react';
import './Menu.css';

import ClearIcon from '@material-ui/icons/Clear';

import { useDispatch, useSelector } from 'react-redux';
import {
    abrirCerrarAgregarMenuAction,
} from '../../actions/adminActions';


const CreateMenu = () => {

    const dispatch = useDispatch();
    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarMenuAction(nuevo_estado));

    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_menu);

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
            <div className="modal-menu">
                <div className="modal-container-menu">
                    <div className="form-container-menu">
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
                                    placeholder="Nombre Menu"
                                    name="description"
                                />
                            </div>
                            <div className="form-row">
                                <label>Tiempo Estimado</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Tiempo Estimado"
                                    name="finished_time"
                                />
                            </div>
                            <div className="form-row">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio"
                                    name="price"
                                />
                            </div>
                            <div className="form-row">
                                <label>Categoria</label>
                                <select
                                    className="form-control"
                                    name="category"
                                >
                                    <option value="">-- Seleccione una categoria --</option>
                                    <option value="pizza">Pizza</option>
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

export default CreateMenu;
