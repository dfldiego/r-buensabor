import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import './Catalogo.css';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerCategoriasAction,
} from '../../actions/adminActions';

import {
    paginaMenuesFiltradosAction,
} from '../../actions/catalogoActions';

const Catalogo = () => {

    const dispatch = useDispatch();

    const consultar_categorias = () => dispatch(obtenerCategoriasAction());
    const entradaMenuesFiltrados = estado => dispatch(paginaMenuesFiltradosAction(estado));

    const categorias = useSelector(state => state.admin.categorias);

    useEffect(() => {
        consultar_categorias();

        // eslint-disable-next-line
    }, [])

    const onClickEntrarMenuesFiltrados = () => {
        entradaMenuesFiltrados(true);
    }

    return (
        <Fragment>
            <div className="fondo-negro">
                <Navbar />
            </div>

            <div className="catalogo seccion contenedor">
                <div className="row_catalogo">
                    {
                        categorias.map(categoria => (
                            <div
                                className="col_2_catalogo"
                                key={categoria._id}
                            >
                                <Link to={`/catalogo/${categoria.name}`}>
                                    <img
                                        src={`http://localhost:4000/api/image/menu-categories/${categoria.img}`}
                                        alt="pizza"
                                        onClick={onClickEntrarMenuesFiltrados}
                                    />
                                </Link>
                                <Link to={`/catalogo/${categoria.name}`}>
                                    <h4 onClick={onClickEntrarMenuesFiltrados}>{categoria.name}</h4>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default Catalogo;
/**
 *
 */