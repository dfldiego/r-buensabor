import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import '../Catalogo/Catalogo.css';
import './CatalogoFiltrado.css';

import Navbar from '../Navbar/Navbar';
import ModalContainer from '../ModalContainer/ModalContainer';
import MenuDetalle from '../CatalogoFiltrado/MenuDetalle';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerCategoriasAction,
    obtenerMenuAction,
} from '../../actions/adminActions';
import {
    abrirCerrarDetalleMenuAction,
    obtenerMenuPorIdAction,
} from '../../actions/catalogoActions';

const CatalogoFiltrado = ({ name }) => {

    const [categoriaFiltrada, setCategoriaFiltrada] = useState(null);
    const [menusFiltradosPorCategoria, setMenusFiltradosPorCategoria] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const consultarCategorias = () => dispatch(obtenerCategoriasAction());
    const consultarMenus = () => dispatch(obtenerMenuAction());
    const abrirModalMenuDetalle = (estadoDetalleMenu) => dispatch(abrirCerrarDetalleMenuAction(estadoDetalleMenu));
    const consultarMenuPorId = idMenu => dispatch(obtenerMenuPorIdAction(idMenu));

    const categorias = useSelector(state => state.admin.categorias);
    const menus = useSelector(state => state.admin.menus);
    const modalMenuDetalle = useSelector(state => state.catalogo.abrir_detalle_menu);

    const filtrarCategoriaPorName = nombreCategoria => {
        const categoriaEncontradaPorName = categorias.filter(categoria => categoria.name === nombreCategoria);
        setCategoriaFiltrada(categoriaEncontradaPorName[0]);
    }

    const filtrarMenusPorCategoria = (menus, categoria) => {
        const menusFiltrados = menus.filter(menu => menu.category._id === categoria._id);
        setMenusFiltradosPorCategoria(menusFiltrados);
    }

    useEffect(() => {
        consultarCategorias();
        filtrarCategoriaPorName(name);
        consultarMenus();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (categoriaFiltrada !== null) {
            filtrarMenusPorCategoria(menus, categoriaFiltrada);
        }

        // eslint-disable-next-line
    }, [menus])

    const handleClickAbrirModalDetalle = id_menu => {
        consultarMenuPorId(id_menu);

        if (openModal === false) {
            setOpenModal(true);
            abrirModalMenuDetalle(true);
        } else {
            closeModal();
            abrirModalMenuDetalle(false);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // le pasa el state principal al state local
    useEffect(() => {
        setOpenModal(modalMenuDetalle);

        // eslint-disable-next-line
    }, [modalMenuDetalle])

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
                                key={menu._id}
                            >
                                <img
                                    src={require('../../assets/img/pizza.jpg')}
                                    alt="pizza1"
                                    onClick={() => handleClickAbrirModalDetalle(menu._id)}
                                />
                                <div className="titulos">
                                    <h3 className="fw-300">{menu.description}</h3>
                                    <h4 className="price">${menu.price}</h4>
                                </div>
                                <div className="botones">
                                    <input
                                        type="button"
                                        className="btn_ver_detalle"
                                        value="Ver Detalle"
                                        onClick={() => handleClickAbrirModalDetalle(menu._id)}
                                    />
                                    <input
                                        type="button"
                                        className="btn_agregar_carrito"
                                        value="Agregar al Carrito"
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            { modalMenuDetalle ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    <MenuDetalle />
                </ModalContainer>
                : null
            }
        </Fragment>
    )
}

export default CatalogoFiltrado
