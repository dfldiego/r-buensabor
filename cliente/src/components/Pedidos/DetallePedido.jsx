import React, { Fragment, useEffect, useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import '../Carrito/Carrito.css';

//Actions de Redux
import {
    abrirCerrarModalDetallePedidoAction,
    obtenerProductoPorIdAction,
    obtenerMenuPorIdAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const DetallePedido = ({ details }) => {

    const [totalDetallePedido, setTotalDetallePedido] = useState(0);
    const [nombreDetallePedido, setNombreDetallePedido] = useState([]);

    const dispatch = useDispatch();

    const EstadoModalNroOrden = estadoModalNroOrden => dispatch(abrirCerrarModalDetallePedidoAction(estadoModalNroOrden));
    const obtenerProductoPorId = idInsumo => dispatch(obtenerProductoPorIdAction(idInsumo));
    const obtenerMenuPorId = idMenu => dispatch(obtenerMenuPorIdAction(idMenu));

    let modalDetallePedido = useSelector(state => state.admin.abrir_modal_detalle_pedido);
    let DatosPedidoInsumo = useSelector(state => state.admin.insumo_detalles_pedido);
    let DatosPedidoMenu = useSelector(state => state.admin.menu_detalles_pedido);


    const cerrar_modal = () => {
        if (modalDetallePedido) {
            modalDetallePedido = false;
            EstadoModalNroOrden(modalDetallePedido);
        }
        return;
    }

    useEffect(() => {
        console.log(details);
        details.map((detalle) => {
            if (detalle.menu) {
                obtenerMenuPorId(detalle.menu);
            } else if (detalle.product) {
                obtenerProductoPorId(detalle.product);
            }
        })

    }, [])

    useEffect(() => {
        let total = 0;

        console.log(details);
        details.map((detalle) => {
            if (detalle.menu) {
                DatosPedidoMenu.map(DatoMenu => {
                    if (detalle.menu === DatoMenu._id) {
                        detalle.description = DatoMenu.description
                    }
                })
            }
            if (detalle.product) {
                DatosPedidoInsumo.map(DatoInsumo => {
                    if (detalle.product === DatoInsumo._id) {
                        detalle.description = DatoInsumo.description;
                    }
                })
            }
            total = total + detalle.quantity * detalle.subTotal;
        })

        setTotalDetallePedido(total)

    }, [DatosPedidoMenu, DatosPedidoInsumo])

    console.log(DatosPedidoInsumo);
    console.log(DatosPedidoMenu);

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
                                        details.map(detalle =>
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
                                                : null
                                        )
                                    }
                                    {
                                        details.map(detalle =>
                                            detalle.product ?
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
