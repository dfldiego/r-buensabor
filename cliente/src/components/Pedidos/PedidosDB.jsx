import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';
import { } from '../../actions/adminActions';

const PedidosDB = ({ orden }) => {
    //details
    let { number, user, orderDate, endDate, status, shippingType } = orden;

    const usuariosDB = useSelector(state => state.admin.usuariosPedidos);

    const cortadohoraEntrada = orderDate.slice(11);
    const horaEntrada = cortadohoraEntrada.slice(0, 5);

    return (
        <Fragment>
            {
                usuariosDB.map(usuarioDB =>
                    usuarioDB._id === user ?
                        <tr key={usuarioDB._id}>
                            <td>{number}</td>
                            <td>{usuarioDB.name}</td>
                            <td>{usuarioDB.email}</td>
                            <td>{usuarioDB.telephoneNumber}</td>
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
                        : null
                )
            }
        </Fragment>
    )
}

export default PedidosDB
