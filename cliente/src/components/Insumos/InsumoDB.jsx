import React, { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    eliminarInsumoAction,
    obtenerInsumosAction,
    obtenerUnInsumoAction,
    abrirCerrarAgregarInsumoAction,
} from '../../actions/adminActions';

import Swal from 'sweetalert2';

const InsumoDB = ({ insumo }) => {

    const { description, purchase_price, sale_price, current_stock, min_stock, unit_measurement, is_supplies, category } = insumo;

    const dispatch = useDispatch();

    const baja_insumos = datos_insumo => dispatch(eliminarInsumoAction(datos_insumo));
    const abrir_cerrar_insumo = estadoEditarInsumo => dispatch(abrirCerrarAgregarInsumoAction(estadoEditarInsumo));
    const obtener_insumo_editar = datos_insumo => dispatch(obtenerUnInsumoAction(datos_insumo));

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

    const handleClick_editar_insumo = insumo => {
        abrir_cerrar_insumo(true);
        obtener_insumo_editar(insumo);
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
                {
                    category ?
                        <td>{category.description}</td>
                        :
                        <td>{null}</td>
                }
                <td>
                    <div className="acciones">
                        <button className="boton_editar" onClick={() => handleClick_editar_insumo(insumo)}>
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
