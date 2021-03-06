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
    const menu = useSelector(state => state.catalogo.menu_detalle);
    const insumo = useSelector(state => state.catalogo.insumo_detalle);
    const estaAbiertoRestaurante = useSelector(state => state.catalogo.estadoHorariosRestaurante);
    const ingredientesDelMenu = useSelector(state => state.catalogo.ingredientes);

    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

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
                        menu ?
                            <div>
                                <h3 className="fw-300 menu_detalle_descripcion">
                                    {menu.description}
                                    {
                                        menu.mensaje === "NO DISPONIBLE" | !estaAbiertoRestaurante ?
                                            <h3 className="color_rojo">No Disponible</h3>
                                            : null
                                    }
                                </h3>
                                <div className="row_menu_detalle">
                                    <div className="col_2_filtrado">
                                        <img
                                            src={`http://localhost:4000/api/image/menus/${menu.img}`}
                                            alt={menu.description}
                                        />
                                    </div>
                                    <div className="col_2_filtrado row_2_filtrado">
                                        <div className="row_menu_detalle">
                                            <div>
                                                <h4 className="fw-300">Ingredientes:</h4>
                                                <div className="flex_menu_detalle">
                                                    <ul>
                                                        {
                                                            ingredientesDelMenu.map(ingrediente =>
                                                                <li
                                                                    key={ingrediente}
                                                                    className="fw-300 li_ingredientes"
                                                                >{ingrediente}</li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="price">Precio: ${menu.price}</h4>
                                        </div>
                                        <div className="botones">
                                            <input
                                                type="button"
                                                className="btn_agregar_carrito"
                                                value="Agregar al Carrito"
                                                onClick={() => handleClickAgregarAlCarrito(menu)}
                                                disabled={menu.mensaje === "NO DISPONIBLE" || !estaAbiertoRestaurante}
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
                            <h3 className="fw-300 menu_detalle_descripcion">
                                {insumo.description}
                                {
                                    insumo.current_stock === 0 || !estaAbiertoRestaurante ?
                                        <h3 className="color_rojo">No Disponible</h3>
                                        : null
                                }
                            </h3>
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
                                        <h4 className="price">Precio: ${insumo.price}</h4>
                                    </div>
                                    <div className="botones">
                                        <input
                                            type="button"
                                            className="btn_agregar_carrito"
                                            value="Agregar al Carrito"
                                            onClick={() => handleClickAgregarAlCarrito(insumo)}
                                            disabled={insumo.current_stock === 0 || !estaAbiertoRestaurante}
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
