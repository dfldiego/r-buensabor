import React, { Fragment, useState, useEffect } from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import './Carrito.css';

//Actions de Redux
import {
    abrirModalCarritoAction,
    eliminarProductoCarritoAction,
} from '../../actions/homeActions';
import { useDispatch, useSelector } from 'react-redux';

const Carrito = () => {

    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();

    const cerrar_modal_carrito = estadoCarrito => dispatch(abrirModalCarritoAction(estadoCarrito));
    const eliminarProductoCarrito = datosProductoCarrito => dispatch(eliminarProductoCarritoAction(datosProductoCarrito));

    let CerrarModalCarrito = useSelector(state => state.home.abrir_modal_carrito);
    const MenusDeCarrito = useSelector(state => state.home.carrito);

    const cerrar_modal = () => {
        if (CerrarModalCarrito) {
            CerrarModalCarrito = false;
            cerrar_modal_carrito(CerrarModalCarrito);
        }
        return;
    }

    useEffect(() => {
        let total = 0;

        MenusDeCarrito.map(menu => {
            total += Number(menu.price)
        })
        setTotal(total);

        // eslint-disable-next-line
    }, [MenusDeCarrito])

    const handleClickQuitarDelCarrito = datosProductoCarrito => {
        eliminarProductoCarrito(datosProductoCarrito);
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
                            MenusDeCarrito.length === 0 ?
                                <h1 className="tituloCarrito">No hay productos en el carrito</h1>
                                :
                                <div>
                                    <div className="tablaCarrito">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Sub-Total</th>
                                                    <th>Acciones</th>
                                                </tr>
                                                {
                                                    MenusDeCarrito.map(menu => (
                                                        <tr key={menu.uuid}>
                                                            <td className="cart_info">
                                                                <img
                                                                    src={`http://localhost:4000/api/image/menus/${menu.img}`}
                                                                    alt="imagen producto"
                                                                    width="150px"
                                                                />
                                                                <p>{menu.description}</p>
                                                                <small>{menu.category.description}</small>
                                                            </td>
                                                            <td>{menu.price}</td>
                                                            <td>
                                                                <a
                                                                    href="#"
                                                                    onClick={() => handleClickQuitarDelCarrito(menu)}
                                                                >Quitar</a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="total-price">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>Total</td>
                                                    <td>{total}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Carrito

/**
 *
                                                    <th>Cantidad</th>
 * <td>
                                                                <input
                                                                    type="number"
                                                                    name="cantidad"
                                                                    value={cantidad}
                                                                    onChange={handleChangeCantidad}
                                                                />
                                                            </td>
 */