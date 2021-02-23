import React, { Fragment } from 'react';
import './Pedidos.css';

import PedidosDB from '../Pedidos/PedidosDB';
import MisPedidosDB from '../Pedidos/MisPedidosDB';

import { useSelector } from 'react-redux';

const GetPedidos = () => {

    const userStorage = JSON.parse(localStorage.getItem('user'));
    const pedidos_state = useSelector(state => state.admin.pedidos);
    let pedidos_user_usuario_store = useSelector(state => state.home.pedidos_user);


    return (
        <Fragment>
            {!pedidos_user_usuario_store ?
                <div>
                    <h2 className="titulo">Listado de Pedidos</h2>
                    <table className="tabla_mis_pedidos">
                        <thead>
                            <tr>
                                <th scope="col">N° Orden</th>
                                <th scope="col">Nombre Cliente</th>
                                <th scope="col">Email Cliente</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Hora Entrada</th>
                                <th scope="col">Tiempo Estimado</th>
                                <th scope="col">Tipo de Envío</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pedidos_state.length === 0 ?
                                    <tr><td>No hay Pedidos</td></tr>
                                    :
                                    pedidos_state.map(orden => (
                                        (userStorage.role === 'ADMIN_ROLE') || (userStorage.role === 'SUPER_ADMIN_ROLE') ||
                                            (userStorage.role === 'CASHIER_ROLE' && orden.status === 'PENDIENTE') ||
                                            (userStorage.role === 'CASHIER_ROLE' && orden.status === 'TERMINADO') ||
                                            (userStorage.role === 'CASHIER_ROLE' && orden.status === 'FACTURADO') ||
                                            (userStorage.role === 'CASHIER_ROLE' && orden.status === 'EN_DELIVERY') ||
                                            (userStorage.role === 'CASHIER_ROLE' && orden.status === 'CANCELADO') ||
                                            (userStorage.role === 'CHEF_ROLE' && orden.status === 'APROBADO') ||
                                            (userStorage.role === 'CHEF_ROLE' && orden.status === 'EN_PROGRESO')
                                            ?
                                            <PedidosDB
                                                key={orden._id}
                                                orden={orden}
                                            />
                                            :
                                            null
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
                : null
            }

            {
                pedidos_user_usuario_store ?
                    <div>
                        <table className="tabla_mis_pedidos">
                            <thead>
                                <tr>
                                    <th scope="col">N° Orden</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Email Cliente</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Hora Entrada</th>
                                    <th scope="col">Tiempo Estimado</th>
                                    <th scope="col">Tipo de Envío</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pedidos_user_usuario_store.length === 0 && !pedidos_state ?
                                        <tr><td>No hay Pedidos</td></tr>
                                        :
                                        pedidos_user_usuario_store.map(pedidoUser => (
                                            <MisPedidosDB
                                                key={pedidoUser._id}
                                                pedidoUser={pedidoUser}
                                            />
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                    : null
            }
        </Fragment>
    )
}

export default GetPedidos
