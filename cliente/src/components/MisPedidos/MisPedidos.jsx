import React, { Fragment, useState, useEffect } from 'react';

// Estilos
import './MisPedidos.css';
import '../../assets/css/styles.css';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    misPedidosAction,
} from '../../actions/homeActions';


const Perfil = () => {
    const [pedidosUser, setPedidosUser] = useState({
        status: '',
        details: [],
        orderDate: '',
        endDate: '',
        number: 0,
        shippingType: 0,
        user: [],
    });
    const { status, details, orderDate, endDate, number, shippingType, user } = pedidosUser;

    const dispatch = useDispatch();

    const pedido_callAction = estadoPedido => dispatch(misPedidosAction(estadoPedido));

    let abrir_modal_pedidos_store = useSelector(state => state.home.abrir_modal_pedidos);
    let pedidos_user_usuario_store = useSelector(state => state.home.pedidos_user);
    let mensaje = useSelector(state => state.home.mensaje);
    let alerta = useSelector(state => state.home.alerta);

    /************** METODO USE EFFECT ********************************/
    useEffect(() => {
        console.log(pedidos_user_usuario_store);

        setPedidosUser({
            ...pedidosUser,
            status: pedidos_user_usuario_store.status,
            details: pedidos_user_usuario_store.details,
            orderDate: pedidos_user_usuario_store.orderDate,
            endDate: pedidos_user_usuario_store.endDate,
            number: pedidos_user_usuario_store.number,
            shippingType: pedidos_user_usuario_store.shippingType,
            user: pedidos_user_usuario_store.user,
        })

        // eslint-disable-next-line
    }, [pedidos_user_usuario_store])

    /************** METODO PARA CERRAR MODAL *************************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (abrir_modal_pedidos_store) {
            abrir_modal_pedidos_store = false;
            pedido_callAction(abrir_modal_pedidos_store);
        }
        return;
    }

    return (
        <Fragment>
            <div className="pedidos_user">
                <div className="pedidos_user_container">
                    <ClearIcon
                        className="volver"
                        onClick={cerrar_modal}
                    />
                    <h3 className="centrar-texto fw-300">Mis Pedidos</h3>

                </div>
            </div>
        </Fragment>
    )
}

export default Perfil
