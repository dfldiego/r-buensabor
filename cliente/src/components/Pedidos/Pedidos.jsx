import React, { Fragment, useEffect, useState } from 'react';
import './Pedidos.css';

import ModalContainer from '../ModalContainer/ModalContainer';
import DetallePedido from '../Pedidos/DetallePedido';
import GetPedidos from './GetPedidos';

import { useDispatch, useSelector } from 'react-redux'
import {
    obtenerPedidosAction,
    obtenerFacturasAction
} from '../../actions/adminActions';

const Pedidos = () => {

    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const cargarPedidos = () => dispatch(obtenerPedidosAction());
    const obtenerFacturas = () => dispatch(obtenerFacturasAction());

    let modalDetallePedido = useSelector(state => state.admin.abrir_modal_detalle_pedido);
    const pedidoEditar = useSelector(state => state.admin.pedido_editar);

    useEffect(() => {
        cargarPedidos();

        // eslint-disable-next-line
    }, [pedidoEditar]);

    useEffect(() => {
        obtenerFacturas();
    }, []);

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
            <div className="container">
                <div className="row">
                    <div className="buscador">
                        <input
                            type="text"
                            name="buscador"
                            className="input_buscador"
                        />
                        <button
                            href="#"
                            className="button_buscador"
                        >Buscar</button>
                    </div>
                </div>
                <GetPedidos />
            </div>
            { modalDetallePedido ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    <DetallePedido
                    />
                </ModalContainer>
                : null
            }
        </Fragment>
    )
}

export default Pedidos
