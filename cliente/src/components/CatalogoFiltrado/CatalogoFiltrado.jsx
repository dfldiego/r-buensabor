import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import '../Catalogo/Catalogo.css';
import './CatalogoFiltrado.css';

import Navbar from '../Navbar/Navbar';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerCategoriasAction,
    obtenerMenuAction,
} from '../../actions/adminActions';

const CatalogoFiltrado = ({ name }) => {

    const [categoriaFiltrada, setCategoriaFiltrada] = useState(null);
    const [menusFiltradosPorCategoria, setMenusFiltradosPorCategoria] = useState([]);

    const dispatch = useDispatch();

    const consultarCategorias = () => dispatch(obtenerCategoriasAction());
    const consultarMenus = () => dispatch(obtenerMenuAction());

    const categorias = useSelector(state => state.admin.categorias);
    const menus = useSelector(state => state.admin.menus);

    const filtrarCategoriaPorName = nombreCategoria => {
        const categoriaEncontradaPorName = categorias.filter(categoria => categoria.name === nombreCategoria);
        setCategoriaFiltrada(categoriaEncontradaPorName[0]);

        console.log(categoriaEncontradaPorName[0]);
    }

    const filtrarMenusPorCategoria = (menus, categoria) => {
        console.log(categoria._id);
        console.log(menus);
        const menusFiltrados = menus.filter(menu => menu.category._id === categoria._id);
        setMenusFiltradosPorCategoria(menusFiltrados);

        console.log(menusFiltrados);
    }

    useEffect(() => {
        consultarCategorias();
        filtrarCategoriaPorName(name);
        consultarMenus();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(categoriaFiltrada);
        if (categoriaFiltrada !== null) {
            filtrarMenusPorCategoria(menus, categoriaFiltrada);
        }
    }, [menus])

    return (
        <Fragment>
            <div className="fondo-negro">
                <Navbar />
            </div>

            <div className="catalogo seccion contenedor">
                <h2 className="fw-300 centrar-texto">{name}</h2>

                <div className="row">
                    {
                        menusFiltradosPorCategoria.map(menu => (
                            <div
                                className="col_3"
                                key={menusFiltradosPorCategoria._id}
                            >
                                <img
                                    src={require('../../assets/img/pizza.jpg')}
                                    alt="pizza1"
                                />
                                {menu.description}
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default CatalogoFiltrado
