import React, { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    eliminarInsumoAction,
    obtenerInsumosAction,
} from '../../actions/adminActions';

import Swal from 'sweetalert2';

const InsumoDB = ({ insumo }) => {

    const { description, purchase_price, sale_price, current_stock, min_stock, unit_measurement, is_supplies } = insumo;

    const dispatch = useDispatch();

    const baja_insumos = datos_insumo => dispatch(eliminarInsumoAction(datos_insumo));
    const cargarInsumo = () => dispatch(obtenerInsumosAction());

    const recargarTablaInsumo = useSelector(state => state.admin.insumo_eliminar);

    useEffect(() => {
        cargarInsumo();

        // eslint-disable-next-line
    }, [recargarTablaInsumo]);

    const handleClick_eliminar_insumo = async datos_insumos => {

        await Swal.fire({
            title: '¿Estás seguro?',
            text: "Un insumo que se elimina, no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                baja_insumos(datos_insumos);
            }
        });

    }

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
                            onClick={() => handleClick_eliminar_insumo(insumo)}
                        >Eliminar</button>
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default InsumoDB
