import React, { Fragment } from 'react';
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
    const menuPorId = useSelector(state => state.catalogo.menu);
    /* const ingredientesDelMenu = useSelector(state => state.catalogo.ingredientes); */

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
            <div className="modal_menu">
                <div className="modal_container_menu">

                    <ClearIcon
                        className="volver"
                        onClick={cerrar_modal}
                    />
                    {
                        menuPorId ?
                            <div>
                                <h3 className="fw-300 menu_detalle_descripcion">{menuPorId.description}</h3>
                                <div className="row_menu_detalle">
                                    <div className="col_2_filtrado">
                                        <img
                                            src={`http://localhost:4000/api/image/menus/${menuPorId.img}`}
                                            alt={menuPorId.description}
                                        />
                                    </div>
                                    <div className="col_2_filtrado row_2_filtrado">
                                        <div className="row_menu_detalle">
                                            <div>
                                                <h4 className="fw-300">Ingredientes:</h4>
                                                <div className="flex_menu_detalle">
                                                    <ul>
                                                        <li className="fw-300 li_ingredientes">Tomate con Queso y Mondongo</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <h4 className="price">${menuPorId.price}</h4>
                                        </div>
                                        <div className="botones">
                                            <input
                                                type="button"
                                                className="btn_agregar_carrito"
                                                value="Agregar al Carrito"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default MenuDetalle
/**
 * {
                        menuPorId ?
                            <div>
                                <div className="row_menu_detalle">
                                    <h3 className="fw-300 menu_detalle_descripcion">{menuPorId.description}</h3>
                                    <img
                                        src={`http://localhost:4000/api/image/menus/${menuPorId.img}`}
                                        alt={menuPorId.description}
                                    />
                                </div>

                                <div className="row_menu_detalle">
                                    <h4 className="fw-300">Ingredientes:</h4>
                                </div>

                                <div className="row_menu_detalle flex_menu_detalle">
                                    <ul>
                                        <li className="fw-300 li_ingredientes">Tomate con Queso y Mondongo</li>
                                    </ul>
                                    <h4 className="price">${menuPorId.price}</h4>
                                </div>
                            </div>
                            : null
                    }
 */