import React, { Fragment, useEffect } from 'react';
import '../../assets/css/styles.css';
import './Catalogo.css';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerCategoriasAction,
    obtenerCategoriaInsumoFiltradasPorParentAction,
    obtenerMenuAction,
    obtenerIngredientesAction,
} from '../../actions/adminActions';

import {
    paginaMenuesFiltradosAction,
    paginaCatalogoInsumoPadreAction,
} from '../../actions/catalogoActions';

const Catalogo = () => {

    const dispatch = useDispatch();

    const consultar_categorias = () => dispatch(obtenerCategoriasAction());
    const consultar_categoriasInsumo = (idParent) => dispatch(obtenerCategoriaInsumoFiltradasPorParentAction(idParent));
    const entradaMenuesFiltrados = (estado, estaAbierto) => dispatch(paginaMenuesFiltradosAction(estado, estaAbierto));
    const entradaCatalogoInsumoPadre = (estado, categoriaInsumoPadre, estaAbierto) => dispatch(paginaCatalogoInsumoPadreAction(estado, categoriaInsumoPadre, estaAbierto));
    const consultarMenus = () => dispatch(obtenerMenuAction());
    const obtenerIngredientes = () => dispatch(obtenerIngredientesAction());

    const categorias = useSelector(state => state.admin.categoriasSelect);
    const categoriasInsumo = useSelector(state => state.admin.categoriasInsumoSelect);

    useEffect(() => {
        consultar_categorias();
        consultar_categoriasInsumo("undefined");
        consultarMenus();
        obtenerIngredientes();
        // eslint-disable-next-line
    }, [])

    const obtenerDiaActual = () => {
        //obtener dia
        let diaActual = new Date().getDay();    // 0D-1L-2M-3M-4J-5V-6S
        return diaActual;
    }

    const obtenerHoraActual = () => {
        //obtener dia
        let horaActual = new Date().getHours();    // 0-23
        return horaActual;
    }

    const validarHorarioRestaurante = (diaActual, horaActual) => {
        let estaAbierto = false;

        if (diaActual === 0 || diaActual === 6) {
            if (horaActual >= 11 && horaActual < 15) {
                estaAbierto = true;
            }
        }
        if (horaActual >= 8 && horaActual <= 23) {
            estaAbierto = true;
        }

        return estaAbierto;
    }

    const onClickEntrarCatalogoInsumoPadre = (categoriaInsumo) => {
        const diaActual = obtenerDiaActual();
        const horaActual = obtenerHoraActual();
        const estaAbierto = validarHorarioRestaurante(diaActual, horaActual);
        entradaCatalogoInsumoPadre(true, categoriaInsumo, estaAbierto);
    }

    const onClickEntrarMenuesFiltrados = () => {
        const diaActual = obtenerDiaActual();
        const horaActual = obtenerHoraActual();
        const estaAbierto = validarHorarioRestaurante(diaActual, horaActual);
        entradaMenuesFiltrados(true, estaAbierto);
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
                                        onClick={() => onClickEntrarCatalogoInsumoPadre(categoriaInsumo)}
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