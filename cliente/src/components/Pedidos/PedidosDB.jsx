import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    abrirCerrarModalDetallePedidoAction,
    guardarDetallePedidoAction,
} from '../../actions/adminActions';

const PedidosDB = ({ orden }) => {

    const [openModal, setOpenModal] = useState(false);
    let { number, user, orderDate, endDate, status, shippingType, details } = orden;

    const dispatch = useDispatch();

    const EstadoModalNroOrden = estadoModalNroOrden => dispatch(abrirCerrarModalDetallePedidoAction(estadoModalNroOrden));
    const envioDetallePedido = details => dispatch(guardarDetallePedidoAction(details));

    const modalDetallePedido = useSelector(state => state.admin.abrir_modal_detalle_pedido);

    const cortadohoraEntrada = orderDate.slice(11);
    const horaEntrada = cortadohoraEntrada.slice(0, 5);

    const handleClickDetallePedido = e => {
        e.preventDefault();

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
                <td>{status}</td>
                <td>
                    <div className="acciones">
                        <button
                            className="boton_editar"
                        >C
                        </button>
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default PedidosDB
