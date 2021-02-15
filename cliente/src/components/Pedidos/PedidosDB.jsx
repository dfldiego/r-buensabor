import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    abrirCerrarModalDetallePedidoAction,
    guardarDetallePedidoAction,
    obtenerProductoPorIdAction,
    obtenerMenuPorIdAction,
    editarOrdenAction,
    obtenerUnaOrdenAction,
} from '../../actions/adminActions';

const PedidosDB = ({ orden }) => {

    const [openModal, setOpenModal] = useState(false);
    let { number, user, orderDate, endDate, status, shippingType, details } = orden;

    const dispatch = useDispatch();

    const EstadoModalNroOrden = (estadoModalNroOrden, orden) => dispatch(abrirCerrarModalDetallePedidoAction(estadoModalNroOrden, orden));
    const envioDetallePedido = details => dispatch(guardarDetallePedidoAction(details));
    const obtenerProductoPorId = idInsumo => dispatch(obtenerProductoPorIdAction(idInsumo));
    const obtenerMenuPorId = idMenu => dispatch(obtenerMenuPorIdAction(idMenu));
    const editarOrden = (nuevaOrden, facturas) => dispatch(editarOrdenAction(nuevaOrden, facturas));
    const obtenerOrdenEditar = (OrdenEditar) => dispatch(obtenerUnaOrdenAction(OrdenEditar));

    let DatosPedidoInsumo = useSelector(state => state.admin.insumo_detalles_pedido);
    let DatosPedidoMenu = useSelector(state => state.admin.menu_detalles_pedido);
    const modalDetallePedido = useSelector(state => state.admin.abrir_modal_detalle_pedido);
    const facturasDB = useSelector(state => state.admin.facturas);

    const cortadohoraEntrada = orderDate.slice(11);
    const horaEntrada = cortadohoraEntrada.slice(0, 5);

    const handleClickDetallePedido = (e, orden) => {
        e.preventDefault();
        let total = 0;

        //codigo para tener apenas clickeamos en detallePedido.
        details.map((detalle) => {
            if (detalle.menu) {
                obtenerMenuPorId(detalle.menu);
            } else if (detalle.product) {
                obtenerProductoPorId(detalle.product);
            }
        })

        details.map((detalle) => {
            if (detalle.menu || detalle.product) {
                DatosPedidoMenu.map(DatoMenu => {
                    if (detalle.menu === DatoMenu._id) {
                        detalle.description = DatoMenu.description
                    }
                })
                DatosPedidoInsumo.map(DatoInsumo => {
                    if (detalle.product === DatoInsumo._id) {
                        detalle.description = DatoInsumo.description;
                    }
                })
            }

            total = total + detalle.subTotal;
        })

        envioDetallePedido(details);

        if (openModal === false) {
            setOpenModal(true);
            EstadoModalNroOrden(true, orden);
        } else {
            closeModal();
            EstadoModalNroOrden(false, null);
        }

    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // le pasa el state principal al state local
    useEffect(() => {
        setOpenModal(modalDetallePedido);
        // eslint-disable-next-line
    }, [modalDetallePedido])

    const handleClickCambiarEstadoPedido = (e, nuevoEstadoPedido, ordenPedido, facturas) => {
        e.preventDefault();

        obtenerOrdenEditar(ordenPedido);
        //editamos estado de la orden
        ordenPedido.status = nuevoEstadoPedido;
        // llamar al PUT de ORDER y que reciba el estado como param
        editarOrden(ordenPedido, facturas);

    }

    return (
        <Fragment>
            <tr key={number}>
                <td>
                    <a
                        href="#"
                        className="color_azul"
                        onClick={e => handleClickDetallePedido(e, orden)}
                    >{number}
                    </a>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.telephoneNumber}</td>
                <td>{horaEntrada}</td>
                <td>{endDate}</td>
                <td>{
                    shippingType === 0 ?
                        shippingType = "Por Delivery"
                        :
                        shippingType = "Por Local"
                }</td>
                <td>{status}</td>
                <td>
                    <div className="acciones">
                        {
                            status === 'PENDIENTE' ?
                                <span className="botonesPendiente">
                                    <button className="boton_editar_pedidos" onClick={e => handleClickCambiarEstadoPedido(e, 'APROBADO', orden)}>APROBAR</button>
                                    <button className="boton_editar_pedidos fondo_rojo" onClick={e => handleClickCambiarEstadoPedido(e, 'CANCELADO', orden)}>CANCELAR</button>
                                </span>
                                : null

                        }
                        {
                            status === 'APROBADO' ?
                                <button className="boton_editar_pedidos fondo_azul" onClick={e => handleClickCambiarEstadoPedido(e, 'EN_PROGRESO', orden)}>COCINAR</button>
                                :
                                null
                        }
                        {
                            status === 'EN_PROGRESO' ?
                                <button className="boton_editar_pedidos fondo_rosado" onClick={e => handleClickCambiarEstadoPedido(e, 'TERMINADO', orden)}>TERMINAR</button>
                                :
                                null
                        }
                        {
                            status == 'TERMINADO' && shippingType == "Por Delivery" ?
                                <button className="boton_editar_pedidos fondo_violeta" onClick={e => handleClickCambiarEstadoPedido(e, 'EN_DELIVERY', orden)}>DELIVERY</button>
                                :
                                null
                        }
                        {
                            status == 'TERMINADO' && shippingType == "Por Local" ?
                                <button className="boton_editar_pedidos fondo_naranja" onClick={e => handleClickCambiarEstadoPedido(e, 'FACTURADO', orden, facturasDB)}>FACTURAR</button>
                                :
                                null
                        }
                        {
                            status === 'EN_DELIVERY' && shippingType == "Por Delivery" ?
                                <button className="boton_editar_pedidos fondo_negro" onClick={e => handleClickCambiarEstadoPedido(e, 'FACTURADO', orden, facturasDB)}>FACTURAR</button>
                                :
                                null
                        }
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default PedidosDB
