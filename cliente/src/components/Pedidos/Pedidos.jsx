import React, { Fragment, useEffect } from 'react';
import './Pedidos.css';

import GetPedidos from './GetPedidos';

import { useDispatch } from 'react-redux'
import {
    obtenerPedidosAction,
} from '../../actions/adminActions';

const Pedidos = () => {
    const dispatch = useDispatch();

    const cargarPedidos = () => dispatch(obtenerPedidosAction());

    useEffect(() => {
        cargarPedidos();

        // eslint-disable-next-line
    }, []);

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
        </Fragment>
    )
}

export default Pedidos
