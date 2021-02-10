import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    abrirCerrarModalDetallePedidoAction,
    guardarDetallePedidoAction,
    obtenerProductoPorIdAction,
    obtenerMenuPorIdAction,
} from '../../actions/adminActions';

const PedidosDB = ({ orden }) => {

    const [openModal, setOpenModal] = useState(false);
    let { number, user, orderDate, endDate, status, shippingType, details } = orden;

    const dispatch = useDispatch();

    const EstadoModalNroOrden = estadoModalNroOrden => dispatch(abrirCerrarModalDetallePedidoAction(estadoModalNroOrden));
    const envioDetallePedido = details => dispatch(guardarDetallePedidoAction(details));
    const obtenerProductoPorId = idInsumo => dispatch(obtenerProductoPorIdAction(idInsumo));
    const obtenerMenuPorId = idMenu => dispatch(obtenerMenuPorIdAction(idMenu));

    const modalDetallePedido = useSelector(state => state.admin.abrir_modal_detalle_pedido);

    const cortadohoraEntrada = orderDate.slice(11);
    const horaEntrada = cortadohoraEntrada.slice(0, 5);

    const handleClickDetallePedido = e => {
        e.preventDefault();

        //codigo para tener apenas clickeamos en detallePedido.
        details.map((detalle) => {
            if (detalle.menu) {
                obtenerMenuPorId(detalle.menu);
            } else if (detalle.product) {
                obtenerProductoPorId(detalle.product);
            }
        })

        envioDetallePedido(details);

        if (openModal === false) {
            setOpenModal(true);
            EstadoModalNroOrden(true);
        } else {
            closeModal();
            EstadoModalNroOrden(false);
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

    /* const handleClickCambiarEstadoPedido = (e, estado) => {
        e.preventDefault();

        // llamar al PUT de ORDER

    } */

    return (
        <Fragment>
            <tr key={number}>
                <td>
                    <a
                        href="#"
                        className="color_azul"
                        onClick={e => handleClickDetallePedido(e)}
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
                <td>{
                    { status }
                }</td>
                <td>
                    <div className="acciones">


                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default PedidosDB
/**
 * {
                            status === 'PENDIENTE' ?
                                <span>
                                    <button className="boton_editar" onClick={e => handleClickCambiarEstadoPedido(e, 'APROBADO')}>APROBAR</button>
                                    <button className="boton_editar" onClick={e => handleClickCambiarEstadoPedido(e, 'CANCELADO')}>CANCELAR</button>
                                </span>
                                :
                                status === 'APROBADO' ?
                                    <button className="boton_editar" onClick={e => handleClickCambiarEstadoPedido(e, 'TERMINADO')}>TERMINADO</button>
                                    :
                                    status === 'TERMINADO' && shippingType === 0 ?
                                        <button className="boton_editar" onClick={e => handleClickCambiarEstadoPedido(e, 'EN_DELIVERY')}>DELIVERY</button>
                                        :
                                        status === 'TERMINADO' && shippingType === 1 ?
                                            <button className="boton_editar" onClick={e => handleClickCambiarEstadoPedido(e, 'FACTURADO')}>FACTURAR</button>
                                            :
                                            status === 'EN_DELIVERY' ?
                                                <button className="boton_editar" onClick={e => handleClickCambiarEstadoPedido(e, 'FACTURADO')}>FACTURAR</button>
                                                :
                                                null
                        }
 */