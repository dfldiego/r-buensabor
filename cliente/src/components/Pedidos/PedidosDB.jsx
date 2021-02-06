import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';
import { } from '../../actions/adminActions';

const PedidosDB = ({ orden }) => {

    let { number, user, orderDate, endDate, status, shippingType, details } = orden;

    const cortadohoraEntrada = orderDate.slice(11);
    const horaEntrada = cortadohoraEntrada.slice(0, 5);

    const handleClickDetallePedido = e => {
        e.preventDefault();

        console.log("Ingresa a Detalle Pedido");

    }

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
