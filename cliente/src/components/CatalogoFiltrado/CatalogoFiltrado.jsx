import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import '../Catalogo/Catalogo.css';
import './CatalogoFiltrado.css';

import Navbar from '../Navbar/Navbar';
import ModalContainer from '../ModalContainer/ModalContainer';
import MenuDetalle from '../CatalogoFiltrado/MenuDetalle';
import { v4 as uuidv4 } from 'uuid';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarDetalleMenuAction,
    obtenerMenuPorIdAction,
} from '../../actions/catalogoActions';
import {
    agregarMenuACarritoAction,
} from '../../actions/homeActions';

const CatalogoFiltrado = ({ name }) => {

    const [categoriaFiltrada, setCategoriaFiltrada] = useState(null);   // categoriaSelect: _id-name-img
    const [menusFiltradosPorCategoria, setMenusFiltradosPorCategoria] = useState([]);
    let menusFiltradosPorIngredientes = [];   // 4 veces el menu con los 4 ingredientes
    const [menusUnicosFiltradosPorIngredientes, setMenusUnicosFiltradosPorIngredientes] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const abrirModalMenuDetalle = (estadoDetalleMenu) => dispatch(abrirCerrarDetalleMenuAction(estadoDetalleMenu));
    const consultarMenuPorId = idMenu => dispatch(obtenerMenuPorIdAction(idMenu));
    const agregarMenuACarrito = menu => dispatch(agregarMenuACarritoAction(menu));

    const categorias = useSelector(state => state.admin.categoriasSelect);
    const menus = useSelector(state => state.admin.menusSelect);
    const modalMenuDetalle = useSelector(state => state.catalogo.abrir_detalle_menu);
    const IngredientesDB = useSelector(state => state.admin.ingredientes_menu_detalle);

    const filtrarCategoriaPorName = nombreCategoria => {
        const categoriaEncontradaPorName = categorias.filter(categoria => categoria.name === nombreCategoria);
        setCategoriaFiltrada(categoriaEncontradaPorName);
    }

    const filtrarMenusPorCategoria = (menus, categoria) => {
        const menusFiltrados = menus.filter(menu => menu.category._id === categoria[0]._id);
        setMenusFiltradosPorCategoria(menusFiltrados);
    }

    const filtrarMenuPorIngrediente = (IngredientesDB, menusCategorizados) => {
        menusCategorizados.map(menu => IngredientesDB.map(ingredienteDB => (ingredienteDB.menu.description === menu.description) ? menusFiltradosPorIngredientes.push(menu) : null));

        // codigo para eliminar elementos repetidos de un array
        const menusUnicosFiltrados = [...new Set(menusFiltradosPorIngredientes)];
        setMenusUnicosFiltradosPorIngredientes(menusUnicosFiltrados);
    }

    useEffect(() => {
        filtrarCategoriaPorName(name);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (categoriaFiltrada !== null) {
            filtrarMenusPorCategoria(menus, categoriaFiltrada);
        }

        // eslint-disable-next-line
    }, [categoriaFiltrada])

    useEffect(() => {
        if (menusFiltradosPorCategoria.length > 0) {
            filtrarMenuPorIngrediente(IngredientesDB, menusFiltradosPorCategoria);
        }

        // eslint-disable-next-line
    }, [menusFiltradosPorCategoria])

    const handleClickAbrirModalDetalle = id_menu => {
        console.log(id_menu);
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

    const handleClickAgregarAlCarrito = menu => {
        menu.uuid = uuidv4();
        agregarMenuACarrito(menu);
    }

    return (
        <Fragment>
            <div className="fondo-negro">
                <Navbar />
            </div>

            <div className="catalogo seccion contenedor">
                <h2 className="fw-300 centrar-texto">{name}</h2>

                <div className="row">
                    {
                        menusUnicosFiltradosPorIngredientes ?
                            menusUnicosFiltradosPorIngredientes.map(menu => (
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
                                            onClick={() => handleClickAgregarAlCarrito(menu)}
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
