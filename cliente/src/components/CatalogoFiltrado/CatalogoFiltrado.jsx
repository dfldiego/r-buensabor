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
    obtenerInsumosAction,
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
    /* const consultarInsumos = () => dispatch(obtenerInsumosAction()); */

    const categorias = useSelector(state => state.admin.categoriasSelect);
    const menus = useSelector(state => state.admin.menusSelect);
    const modalMenuDetalle = useSelector(state => state.catalogo.abrir_detalle_menu);
    const categoriaInsumoPadre = useSelector(state => state.catalogo.categoria_insumo_padre);
    const insumos = useSelector(state => state.admin.insumos);

    /**
     * 
     * 1) tengo la categoriaInsumo del padre.
     * 2) cuando cargue la pagina debo ejecutar un metodo que me traiga todos los productos(insumos) con categoria insumo padre.
     * 3) mostrar todos los insumos con ese padre.
     */

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
        /* consultarInsumos(); */

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

    console.log(insumos);
    console.log(categoriaInsumoPadre);

    return (
        <Fragment>
            <div className="fondo-negro">
                <Navbar />
            </div>

            <div className="catalogo seccion contenedor">
                <h2 className="fw-300 centrar-texto">{name}</h2>

                <div className="row">
                    {
                        menusFiltradosPorCategoria ?
                            menusFiltradosPorCategoria.map(menu => (
                                <div
                                    className="col_3"
                                    key={menu._id}
                                >
                                    <img
                                        src={`http://localhost:4000/api/image/menus/${menu.img}`}
                                        alt={menu.description}
                                        className="imagen_detalle"
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
                            : null
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
