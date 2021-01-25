import React, { Fragment, useEffect } from 'react';
import '../../assets/css/styles.css';
import './Catalogo.css';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerCategoriaInsumoFiltradasPorParentAction,
} from '../../actions/adminActions';

import {
    paginaMenuesFiltradosAction,
    guardarCategoriaInsumoPadreAction,
} from '../../actions/catalogoActions';

const CatalogoInsumoPadre = () => {
    const dispatch = useDispatch();

    const consultar_categoriasInsumo = (idParent) => dispatch(obtenerCategoriaInsumoFiltradasPorParentAction(idParent));
    const entradaMenuesFiltrados = estado => dispatch(paginaMenuesFiltradosAction(estado));
    const guardarCategoriaInsumoPadre = categoriaInsumoPadre => dispatch(guardarCategoriaInsumoPadreAction(categoriaInsumoPadre));

    const categoriasInsumo = useSelector(state => state.admin.categoriasInsumoSelect);
    const categoriaInsumoPadre = useSelector(state => state.catalogo.categoria_insumo_padre);
    console.log(categoriaInsumoPadre);

    useEffect(() => {
        consultar_categoriasInsumo(categoriaInsumoPadre._id);

        // eslint-disable-next-line
    }, [])

    const onClickEntrarMenuesFiltrados = (categoriaInsumo) => {
        guardarCategoriaInsumoPadre(categoriaInsumo);
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
                                        onClick={() => onClickEntrarMenuesFiltrados(categoriaInsumo)}
                                    />
                                </Link>
                                <Link to={`/catalogoFiltrado/${categoriaInsumo.description}`}>
                                    <h4 onClick={() => onClickEntrarMenuesFiltrados(categoriaInsumo)}>{categoriaInsumo.description}</h4>
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
