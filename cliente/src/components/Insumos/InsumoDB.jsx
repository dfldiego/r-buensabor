import React, { Fragment } from 'react';

const InsumoDB = ({ insumo }) => {

    const { description, purchase_price, sale_price, current_stock, min_stock, unit_measurement, is_supplies } = insumo;

    return (
        <Fragment>
            <tr>
                <td>{description}</td>
                <td>{purchase_price}</td>
                <td>{sale_price}</td>
                <td>{current_stock}</td>
                <td>{min_stock}</td>
                <td>{unit_measurement}</td>
                {
                    is_supplies ?
                        <td>si</td>
                        :
                        <td>no</td>
                }

                <td>
                    <div className="acciones">
                        <button className="boton_editar">
                            Editar
                        </button>
                        <button
                            type="button"
                            className="boton_borrar"
                        >Eliminar</button>
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default InsumoDB
