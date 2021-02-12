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

    const cerrar_modal = () => {
        if (modalDetallePedido) {
            modalDetallePedido = false;
            EstadoModalNroOrden(modalDetallePedido);
        }
        return;
    }

    useEffect(() => {
        let total = 0;
        console.log(details);
        if (details.length > 0) {
            const obtenerDetallePedido = (details) => {
                details.map((detalle) => {
                    if (detalle.menu || detalle.product) {
                        DatosPedidoMenu.map(DatoMenu => {
                            if (detalle.menu === DatoMenu._id) {
                                detalle.description = DatoMenu.description;
                                setDetalleCadena([...detalleCadena, detalle]);
                            }
                        })
                        DatosPedidoInsumo.map(DatoInsumo => {
                            if (detalle.product === DatoInsumo._id) {
                                detalle.description = DatoInsumo.description;
                                setDetalleCadena([...detalleCadena, detalle]);
                            }
                        })
                    }

                    total = total + detalle.subTotal;
                })

            }
            obtenerDetallePedido(details);

            let descuento = total * 0.1;
            setDescuento(descuento);

            total = total - descuento;
            setTotalDetallePedido(total);
        }

    }, [DatosPedidoMenu, DatosPedidoInsumo]);
    console.log(details);

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
                                <tbody>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Sub-Total</th>
                                    </tr>
                                    {
                                        detalleCadena.map(detalle =>
                                            detalle.menu ?
                                                <tr>
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
                                                : detalle.product ?
                                                    <tr>
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
                                        <td></td>
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
                                        <td></td>
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
