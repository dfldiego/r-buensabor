import React, { Fragment, useEffect } from 'react';
import './Categorias.css';
import CategoriaDB from './CategoriaDB';

import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerCategoriaAction,
} from '../../actions/adminActions';

const GetCategorias = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // consultar la api
        const cargarCategorias = () => dispatch(obtenerCategoriaAction());
        //llamar la funcion
        cargarCategorias();

        // eslint-disable-next-line
    }, []);

    const categorias_state = useSelector(state => state.admin.categorias);
    const error = useSelector(state => state.admin.error);
    const cargando = useSelector(state => state.admin.loading);
    if (!categorias_state) {
        return;
    }

    return (
        <Fragment>
            <h2 className="titulo">Listado de Categorias</h2>
            {error ? <p className="error">Hubo un error</p> : null}
            {cargando ? <p>Cargando...</p> : null}
            <table>
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias_state.length === 0 ? <tr><td>No hay categorias</td></tr> :
                            categorias_state.map((categoria) => (
                                <CategoriaDB
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

export default GetCategorias
