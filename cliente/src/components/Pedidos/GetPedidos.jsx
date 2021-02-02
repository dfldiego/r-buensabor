import React, { Fragment, useEffect } from 'react';
import './Pedidos.css';

import PedidosDB from '../Pedidos/PedidosDB';

import {
    obtenerUsuariosAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const GetPedidos = () => {

    const dispatch = useDispatch();

    const traerUsuarios = () => dispatch(obtenerUsuariosAction());

    const pedidos_state = useSelector(state => state.admin.pedidos);

    useEffect(() => {
        traerUsuarios();
    }, [])

    if (!pedidos_state) {
        return;
    }

    return (
        <Fragment>
            <h2 className="titulo">Listado de Pedidos</h2>
            <table>
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
                        pedidos_state.length === 0 ? <tr><td>No hay Pedidos</td></tr> :
                            pedidos_state.map(orden => (
                                <PedidosDB
                                    key={orden._id}
                                    orden={orden}
                                />
                            ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default GetPedidos
