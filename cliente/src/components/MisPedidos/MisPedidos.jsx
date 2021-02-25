import React, { Fragment, useState, useEffect } from 'react';

// Estilos
import './MisPedidos.css';
import '../../assets/css/styles.css';
import GetPedidos from '../Pedidos/GetPedidos';
import ModalContainer from '../ModalContainer/ModalContainer';
import DetallePedido from '../Pedidos/DetallePedido';
// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    misPedidosAction,
} from '../../actions/homeActions';


const MisPedidos = () => {

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const pedido_callAction = estadoPedido => dispatch(misPedidosAction(estadoPedido));

    let abrir_modal_pedidos_store = useSelector(state => state.home.abrir_modal_pedidos);
    let mensaje = useSelector(state => state.home.mensaje);
    let alerta = useSelector(state => state.home.alerta);
    let modalDetallePedido = useSelector(state => state.admin.abrir_modal_detalle_pedido);

    /************** METODO PARA CERRAR MODAL *************************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (abrir_modal_pedidos_store) {
            abrir_modal_pedidos_store = false;
            pedido_callAction(abrir_modal_pedidos_store);
        }
        return;
    }

    /************** METODO PARA CERRAR/ABRIR MODAL DETALLE *************************/
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
            <div className="pedidos_user">
                <div className="pedidos_user_container">
                    <ClearIcon
                        className="volver"
                        onClick={cerrar_modal}
                    />
                    <h3 className="centrar-texto fw-300">Mis Pedidos</h3>
                    <GetPedidos
                    />
                </div>
                {modalDetallePedido ?
                    <ModalContainer
                        openModal={openModal}
                        closeModal={closeModal}
                    >
                        <DetallePedido
                        />
                    </ModalContainer>
                    : null
                }
            </div>
        </Fragment>
    )
}

export default MisPedidos;
