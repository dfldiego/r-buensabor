import React, { Fragment, useEffect } from 'react';
import './Insumos.css';

import InsumoDB from '../Insumos/InsumoDB';

import {
    obtenerInsumosAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const GetInsumos = () => {

    const dispatch = useDispatch();

    const insumos_state = useSelector(state => state.admin.insumos);

    useEffect(() => {

        const cargarInsumos = () => dispatch(obtenerInsumosAction());
        cargarInsumos();

        // eslint-disable-next-line
    }, []);

    if (!insumos_state) {
        return;
    }

    return (
        <Fragment>
            <h2 className="titulo">Listado de Insumos</h2>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio de Compra</th>
                        <th scope="col">Precio de Venta</th>
                        <th scope="col">Stock Actual</th>
                        <th scope="col">Stock Minimo</th>
                        <th scope="col">Unidad de Medida</th>
                        <th scope="col">¿Es ingrediente?</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        insumos_state.length === 0 ? <tr><td>No hay insumos</td></tr> :
                            insumos_state.map(insumo => (
                                <InsumoDB
                                    key={insumo._id}
                                    insumo={insumo}
                                />
                            ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default GetInsumos
