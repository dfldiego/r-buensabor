import React, { Fragment, useState } from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import './Carrito.css';

//Actions de Redux
import {
    abrirModalCarritoAction,

} from '../../actions/homeActions';
import { useDispatch, useSelector } from 'react-redux';

const Carrito = () => {

    const dispatch = useDispatch();

    const cerrar_modal_carrito = estadoCarrito => dispatch(abrirModalCarritoAction(estadoCarrito));

    let CerrarModalCarrito = useSelector(state => state.home.abrir_modal_carrito);
    const MenusDeCarrito = useSelector(state => state.home.carrito);

    const cerrar_modal = () => {
        if (CerrarModalCarrito) {
            CerrarModalCarrito = false;
            cerrar_modal_carrito(CerrarModalCarrito);
        }
        return;
    }

    return (
        <Fragment>
            <div className="modal-carrito">
                <div className="modal-container-carrito">
                    <div className="form-container-carrito">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />
                        {
                            MenusDeCarrito.map(menu => (
                                <div
                                    key={menu._id}
                                >
                                    <p>{menu.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Carrito
