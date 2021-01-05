import React, { Fragment, useEffect } from 'react';
import './InsumosCategorias.css';

import InsumoCategoriaDB from '../InsumosCategorias/InsumoCategoriaDB';

import {
    obtenerCategoriaInsumoAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const GetInsumoCategoria = () => {

    const dispatch = useDispatch();

    const categorias_insumo_state = useSelector(state => state.admin.categorias_insumo);

    useEffect(() => {

        const cargarCategoriasInsumo = () => dispatch(obtenerCategoriaInsumoAction());
        cargarCategoriasInsumo();

        // eslint-disable-next-line
    }, []);

    if (!categorias_insumo_state) {
        return;
    }

    return (
        <Fragment>
            <h2 className="titulo">Listado de Categorias de Insumo</h2>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Categoria Padre</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias_insumo_state.length === 0 ? <tr><td>No hay Categorias de insumo</td></tr> :
                            categorias_insumo_state.map(categoria => (
                                <InsumoCategoriaDB
                                    key={categoria._id}
                                    categoria={categoria}
                                />
                            ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default GetInsumoCategoria
