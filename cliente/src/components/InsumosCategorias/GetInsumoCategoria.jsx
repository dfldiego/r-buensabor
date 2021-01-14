import React, { Fragment } from 'react';
import './InsumosCategorias.css';

import InsumoCategoriaDB from '../InsumosCategorias/InsumoCategoriaDB';
import PaginacionInsumoCategoria from './PaginacionInsumoCategoria';

import { useSelector } from 'react-redux';

const GetInsumoCategoria = () => {

    const categorias_insumo_state = useSelector(state => state.admin.categorias_insumo);
    const error = useSelector(state => state.admin.error);
    const mensaje_error = useSelector(state => state.admin.mensaje);

    if (!categorias_insumo_state) {
        return;
    }

    return (
        <Fragment>
            <h2 className="titulo">Listado de Categorias de Insumo</h2>
            {
                error ? <p className="error">{mensaje_error}</p> : null
            }
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
            <PaginacionInsumoCategoria />
        </Fragment>
    )
}

export default GetInsumoCategoria
