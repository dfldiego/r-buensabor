import React, { Fragment, useEffect } from 'react';
import '../../assets/css/styles.css';
import './Catalogo.css';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerCategoriasAction,
    obtenerCategoriaInsumoAbueloAction,
} from '../../actions/adminActions';

import {
    paginaMenuesFiltradosAction,
    paginaCatalogoInsumoPadreAction,
} from '../../actions/catalogoActions';

const Catalogo = () => {

    const dispatch = useDispatch();

    const consultar_categorias = () => dispatch(obtenerCategoriasAction());
    const consultar_categoriasInsumo = () => dispatch(obtenerCategoriaInsumoAbueloAction());
    const entradaMenuesFiltrados = estado => dispatch(paginaMenuesFiltradosAction(estado));
    const entradaCatalogoInsumoPadre = estado => dispatch(paginaCatalogoInsumoPadreAction(estado));

    const categorias = useSelector(state => state.admin.categoriasSelect);
    const categoriasInsumo = useSelector(state => state.admin.categoriasInsumoSelect);

    useEffect(() => {
        consultar_categorias();
        consultar_categoriasInsumo();

        // eslint-disable-next-line
    }, [])

    const onClickEntrarMenuesFiltrados = () => {
        entradaMenuesFiltrados(true);
    }

    const onClickEntrarCatalogoInsumoPadre = () => {
        entradaCatalogoInsumoPadre(true);
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
                                <Link to={`/catalogoFiltrado/${categoria.name}`}>
                                    <img
                                        src={`http://localhost:4000/api/image/menu-categories/${categoria.img}`}
                                        alt={categoria.name}
                                        onClick={onClickEntrarMenuesFiltrados}
                                    />
                                </Link>
                                <Link to={`/catalogoFiltrado/${categoria.name}`}>
                                    <h4 onClick={onClickEntrarMenuesFiltrados}>{categoria.name}</h4>
                                </Link>
                            </div>
                        ))
                    }
                    {
                        categoriasInsumo.map(categoriaInsumo => (
                            <div
                                className="col_2_catalogo"
                                key={categoriaInsumo._id}
                            >
                                <Link to={`/catalogo/${categoriaInsumo.description}`}>
                                    <img
                                        src={`http://localhost:4000/api/image/product-categories/${categoriaInsumo.img}`}
                                        alt={categoriaInsumo.description}
                                        onClick={onClickEntrarCatalogoInsumoPadre}
                                    />
                                </Link>
                                <Link to={`/catalogo/${categoriaInsumo.description}`}>
                                    <h4 onClick={() => onClickEntrarCatalogoInsumoPadre(categoriaInsumo)}>{categoriaInsumo.description}</h4>
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