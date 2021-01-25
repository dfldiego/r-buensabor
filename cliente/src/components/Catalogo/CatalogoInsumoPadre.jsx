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
    paginaMenuesInsumosFiltradosAction,
    guardarCategoriaInsumoPadreAction,
} from '../../actions/catalogoActions';

const CatalogoInsumoPadre = () => {
    const dispatch = useDispatch();

    const consultar_categoriasInsumo = (idParent) => dispatch(obtenerCategoriaInsumoFiltradasPorParentAction(idParent));
    const entradaMenusInsumosFiltrados = estado => dispatch(paginaMenuesInsumosFiltradosAction(estado));
    const guardarCategoriaInsumoPadre = categoriaInsumoPadre => dispatch(guardarCategoriaInsumoPadreAction(categoriaInsumoPadre));

    const categoriasInsumo = useSelector(state => state.admin.categoriasInsumoSelect);
    const categoriaInsumoPadre = useSelector(state => state.catalogo.categoria_insumo_padre);
    console.log(categoriaInsumoPadre);

    useEffect(() => {
        consultar_categoriasInsumo(categoriaInsumoPadre._id);

        // eslint-disable-next-line
    }, [])

    const onClickEntrarMenuesInsumoFiltrados = (categoriaInsumo) => {
        guardarCategoriaInsumoPadre(categoriaInsumo);
        entradaMenusInsumosFiltrados(true);
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

                                <Link to={`/catalogoFiltradoInsumo/${categoriaInsumo.description}`}>
                                    <img
                                        src={`http://localhost:4000/api/image/product-categories/${categoriaInsumo.img}`}
                                        alt={categoriaInsumo.description}
                                        onClick={() => onClickEntrarMenuesInsumoFiltrados(categoriaInsumo)}
                                    />
                                </Link>
                                <Link to={`/catalogoFiltradoInsumo/${categoriaInsumo.description}`}>
                                    <h4 onClick={() => onClickEntrarMenuesInsumoFiltrados(categoriaInsumo)}>{categoriaInsumo.description}</h4>
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
