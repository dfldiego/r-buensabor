import React, { Fragment } from 'react';
import './CatalogoFiltrado.css';

import ClearIcon from '@material-ui/icons/Clear';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import {
    abrirCerrarDetalleMenuAction,
} from '../../actions/catalogoActions';
import {
    agregarMenuACarritoAction,
} from '../../actions/homeActions';

const MenuDetalle = () => {

    const dispatch = useDispatch();

    const cerrar_modal_callAction = estadoDetalleMenu => dispatch(abrirCerrarDetalleMenuAction(estadoDetalleMenu));
    const agregarItemACarrito = menu => dispatch(agregarMenuACarritoAction(menu));

    let cerrar_modal_state_store = useSelector(state => state.catalogo.abrir_detalle_menu);
    const menuPorId = useSelector(state => state.catalogo.menu);
    const insumo = useSelector(state => state.catalogo.insumo_detalle);

    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    console.log(menuPorId);
    console.log(insumo);

    const handleClickAgregarAlCarrito = item => {
        item.uuid = uuidv4();
        agregarItemACarrito(item);
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
                                                        <li className="fw-300 li_ingredientes"></li>
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
                                                onClick={() => handleClickAgregarAlCarrito(menuPorId)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }

                    {insumo ?
                        <div>
                            <h3 className="fw-300 menu_detalle_descripcion">{insumo.description}</h3>
                            <div className="row_menu_detalle">
                                <div className="col_2_filtrado">
                                    <img
                                        src={`http://localhost:4000/api/image/products/${insumo.img}`}
                                        alt={insumo.description}
                                    />
                                </div>
                                <div className="col_2_filtrado row_2_filtrado">
                                    <div className="row_menu_detalle">
                                        <div>
                                            <h4 className="fw-300">Detalles:</h4>
                                            <div className="flex_menu_detalle">
                                                <ul>
                                                    <li className="fw-300 li_ingredientes"></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <h4 className="price">${insumo.price}</h4>
                                    </div>
                                    <div className="botones">
                                        <input
                                            type="button"
                                            className="btn_agregar_carrito"
                                            value="Agregar al Carrito"
                                            onClick={() => handleClickAgregarAlCarrito(insumo)}
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
