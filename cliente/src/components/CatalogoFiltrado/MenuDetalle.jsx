import React, { Fragment, useEffect, useState } from 'react';
import './CatalogoFiltrado.css';

import ClearIcon from '@material-ui/icons/Clear';

import { useDispatch, useSelector } from 'react-redux';
import {
    abrirCerrarDetalleMenuAction,
} from '../../actions/catalogoActions';

const MenuDetalle = () => {

    const dispatch = useDispatch();

    const cerrar_modal_callAction = estadoDetalleMenu => dispatch(abrirCerrarDetalleMenuAction(estadoDetalleMenu));

    let cerrar_modal_state_store = useSelector(state => state.catalogo.abrir_detalle_menu);

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
                        <h1>MODAL</h1>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MenuDetalle
