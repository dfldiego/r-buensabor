import React, { Fragment, useEffect, useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import '../Carrito/Carrito.css';

//Actions de Redux
import {
    abrirCerrarModalDetallePedidoAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const DetallePedido = () => {

    const [totalDetallePedido, setTotalDetallePedido] = useState(0);
    const [descuento, setDescuento] = useState(0);
    const [detalleCadena, setDetalleCadena] = useState([]);
    const dispatch = useDispatch();

    const EstadoModalNroOrden = estadoModalNroOrden => dispatch(abrirCerrarModalDetallePedidoAction(estadoModalNroOrden));

    let DatosPedidoInsumo = useSelector(state => state.admin.insumo_detalles_pedido);
    let DatosPedidoMenu = useSelector(state => state.admin.menu_detalles_pedido);
    let modalDetallePedido = useSelector(state => state.admin.abrir_modal_detalle_pedido);
    let details = useSelector(state => state.admin.detalles_pedido);
    const orden = useSelector(state => state.admin.orden);

    const cerrar_modal = () => {
        if (modalDetallePedido) {
            modalDetallePedido = false;
            EstadoModalNroOrden(modalDetallePedido);
        }
        return;
    }

    useEffect(() => {
        let total = 0;
        if (details.length > 0) {
            const obtenerDetallePedido = (details) => {
                for (let i = 0; i < details.length; i++) {
                    console.log(details[i]);
                    if (details[i].menu) {
                        for (const DatoMenu of DatosPedidoMenu) {
                            if (details[i].menu === DatoMenu._id) {
                                details[i].description = DatoMenu.description;
                                setDetalleCadena([...detalleCadena, details[i]]);
                            }
                        }
                    } else if (details[i].product) {
                        for (const DatoInsumo of DatosPedidoInsumo) {
                            if (details[i].product === DatoInsumo._id) {
                                details[i].description = DatoInsumo.description;
                                setDetalleCadena([...detalleCadena, details[i]]);
                            }
                        }
                    }

                    total = total + details[i].subTotal;
                }

            }
            obtenerDetallePedido(details);

            if (orden.shippingType === 1) {
                let descuento = total * 0.1;
                setDescuento(descuento);
            } else {
                setDescuento(0);
            }

            total = total - descuento;
            setTotalDetallePedido(total);
        }

        // eslint-disable-next-line
    }, [DatosPedidoMenu, DatosPedidoInsumo]);

    return (
        <Fragment>
            <div className="modal-detalle_pedido">
                <div className="modal-container-detalle_pedido">
                    <div className="form-container-detalle_pedido">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />
                        <h2 className="titulo">Detalle de Orden</h2>

                        <div className="tablaCarrito">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Sub-Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        detalleCadena.map(detalle =>
                                            detalle.menu ?
                                                <tr key={detalle._id}>
                                                    <td>
                                                        <h4>{detalle.description}</h4>
                                                    </td>
                                                    <td>
                                                        <h4>{detalle.quantity}</h4>
                                                    </td>
                                                    <td>
                                                        <h4>{detalle.subTotal}</h4>
                                                    </td>
                                                </tr>
                                                : null
                                        )
                                    } {
                                        detalleCadena.map((detalle, index) =>
                                            detalle.product ?
                                                <tr key={index}>
                                                    <td>
                                                        <h4>{detalle.description}</h4>
                                                    </td>
                                                    <td>
                                                        <h4>{detalle.quantity}</h4>
                                                    </td>
                                                    <td>
                                                        <h4>{detalle.subTotal}</h4>
                                                    </td>
                                                </tr>
                                                : null
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="total-price">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><h4>-</h4></td>
                                        <td className="total">Descuento</td>
                                        <td className="total">${descuento}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="total-price">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><h4>-</h4></td>
                                        <td className="total">Total</td>
                                        <td className="total">${totalDetallePedido}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DetallePedido;
