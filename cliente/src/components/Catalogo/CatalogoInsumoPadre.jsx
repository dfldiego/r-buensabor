import React, { Fragment, useEffect } from 'react';
import '../../assets/css/styles.css';
import './Catalogo.css';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerCategoriaInsumoPadreAction,
} from '../../actions/adminActions';

import {
    paginaMenuesFiltradosAction,
} from '../../actions/catalogoActions';

const CatalogoInsumoPadre = () => {
    const dispatch = useDispatch();

    const consultar_categoriasInsumo = () => dispatch(obtenerCategoriaInsumoPadreAction());
    const entradaMenuesFiltrados = estado => dispatch(paginaMenuesFiltradosAction(estado));

    const categoriasInsumo = useSelector(state => state.admin.categoriasInsumoSelect);

    useEffect(() => {
        consultar_categoriasInsumo();

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
                        categoriasInsumo.map(categoriaInsumo => (
                            < div
                                className="col_2_catalogo"
                                key={categoriaInsumo._id}
                            >

                                <Link to={`/catalogoFiltrado/${categoriaInsumo.description}`}>
                                    <img
                                        src={`http://localhost:4000/api/image/product-categories/${categoriaInsumo.img}`}
                                        alt={categoriaInsumo.description}
                                        onClick={onClickEntrarMenuesFiltrados}
                                    />
                                </Link>
                                <Link to={`/catalogoFiltrado/${categoriaInsumo.description}`}>
                                    <h4 onClick={onClickEntrarMenuesFiltrados}>{categoriaInsumo.description}</h4>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment >
    );
}

export default CatalogoInsumoPadre
