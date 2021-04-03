import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import '../Catalogo/Catalogo.css';
import './CatalogoFiltrado.css';

import Navbar from '../Navbar/Navbar';
import ModalContainer from '../ModalContainer/ModalContainer';
import MenuDetalle from '../CatalogoFiltrado/MenuDetalle';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarDetalleMenuAction,
    guardarMenuDetalleAction,
    obtenerIngredientesDelMenuAction,
    obtenerDatosUsuarioAction,
} from '../../actions/catalogoActions';
import {
    agregarMenuACarritoAction,
} from '../../actions/homeActions';


const CatalogoFiltrado = ({ name }) => {

    // redireccionar a la pagina principal una vez que editamos el producto
    const history = useHistory();

    const [categoriaFiltrada, setCategoriaFiltrada] = useState(null);   // categoriaSelect: _id-name-img
    const [menusFiltradosPorCategoria, setMenusFiltradosPorCategoria] = useState([]);
    let menusFiltradosPorIngredientes = [];   // 4 veces el menu con los 4 ingredientes
    const [menusUnicosFiltradosPorIngredientes, setMenusUnicosFiltradosPorIngredientes] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const abrirModalMenuDetalle = (estadoDetalleMenu) => dispatch(abrirCerrarDetalleMenuAction(estadoDetalleMenu));
    const guardarMenu = menu => dispatch(guardarMenuDetalleAction(menu));
    const agregarMenuACarrito = menu => dispatch(agregarMenuACarritoAction(menu));
    const obtenerIngredientesDelMenu = (menu) => dispatch(obtenerIngredientesDelMenuAction(menu));
    const obtenerDatosUsuario = () => dispatch(obtenerDatosUsuarioAction());

    const categorias = useSelector(state => state.admin.categoriasSelect);
    const menus = useSelector(state => state.admin.menusSelect);
    const modalMenuDetalle = useSelector(state => state.catalogo.abrir_detalle_menu);
    const IngredientesDB = useSelector(state => state.admin.ingredientes_menu_detalle);
    const mensaje = useSelector(state => state.catalogo.mensaje);
    const estaAbiertoRestaurante = useSelector(state => state.catalogo.estadoHorariosRestaurante);
    const errorCatalogo = useSelector(state => state.catalogo.error);
    const usuarioData = useSelector(state => state.catalogo.usuarioData);

    const filtrarCategoriaPorName = nombreCategoria => {
        const categoriaEncontradaPorName = categorias.filter(categoria => categoria.name === nombreCategoria);
        setCategoriaFiltrada(categoriaEncontradaPorName);
    }

    const filtrarMenusPorCategoria = (menus, categoria) => {
        const menusFiltrados = menus.filter(menu => menu.category._id === categoria[0]._id);
        setMenusFiltradosPorCategoria(menusFiltrados);
    }

    const filtrarMenuPorIngrediente = (IngredientesDB, menusCategorizados) => {

        //recorro los menus y si el array de menues de los ingredientes contiene al menu devuelvo un true sino false.
        for (const menu of menusCategorizados) {
            for (const ingrediente of IngredientesDB) {
                if (ingrediente.menu.description === menu.description) {
                    if (ingrediente.product.current_stock >= ingrediente.quantity) {
                        menusFiltradosPorIngredientes.push(menu);
                    } else {
                        menu.mensaje = "NO DISPONIBLE";
                        menusFiltradosPorIngredientes.push(menu);
                    }
                }
            }
        }
        console.log("menusFiltradosPorIngredientes", menusFiltradosPorIngredientes);
        // codigo para eliminar elementos repetidos de un array
        const menusUnicosFiltrados = [...new Set(menusFiltradosPorIngredientes)];
        setMenusUnicosFiltradosPorIngredientes(menusUnicosFiltrados);
    }

    useEffect(() => {
        filtrarCategoriaPorName(name);
        obtenerDatosUsuario();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (categoriaFiltrada !== null) {
            filtrarMenusPorCategoria(menus, categoriaFiltrada);
        }

        // eslint-disable-next-line
    }, [setCategoriaFiltrada, categoriaFiltrada])

    useEffect(() => {
        if (menusFiltradosPorCategoria.length > 0) {
            filtrarMenuPorIngrediente(IngredientesDB, menusFiltradosPorCategoria);
        }

        // eslint-disable-next-line
    }, [menusFiltradosPorCategoria])

    const handleClickAbrirModalDetalle = menu => {
        guardarMenu(menu);
        /**********aqui debemos agregar un metodo que llame a los ingredientes del menu y debemos obtener estos ingredientes en el useEffect() de MenuDetalle y luego recorrerlos con un map en el html */
        obtenerIngredientesDelMenu(menu);

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

    const handleClickAgregarAlCarrito = async menu => {
        menu.uuid = uuidv4();

        // comprobar si tiene direccion y telefono asociado
        console.log("usuarioData", usuarioData);
        if (!usuarioData.telephoneNumber || !usuarioData.address) {
            await Swal.fire({
                icon: 'error',
                title: 'No tienes tus datos completos',
                text: 'Por favor, completa tus datos en Perfil para poder agregar al carrito menues e insumos',
            });
            history.go(0);
            return;
        }

        agregarMenuACarrito(menu);
    }

    return (
        <Fragment>
            <div className="fondo-negro">
                <Navbar />
            </div>

            <div className="catalogo seccion contenedor">
                <h2 className="fw-300 centrar-texto">{name}</h2>
                {
                    errorCatalogo ? <p className="error">{mensaje}</p> : null
                }
                <div className="row_catalogo_filtrado">
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
                                        onClick={() => handleClickAbrirModalDetalle(menu)}
                                    />
                                    <div className="titulos">
                                        <h3 className="fw-300">{menu.description}</h3>
                                        {
                                            menu.mensaje === "NO DISPONIBLE" || !estaAbiertoRestaurante ?
                                                <h3 className="color_rojo">No Disponible</h3>
                                                : null
                                        }
                                        <h4 className="price">${menu.price}</h4>
                                    </div>
                                    <div className="botones">
                                        <input
                                            type="button"
                                            className="btn_ver_detalle"
                                            value="Ver Detalle"
                                            onClick={() => handleClickAbrirModalDetalle(menu)}
                                        />
                                        <input
                                            type="button"
                                            className="btn_agregar_carrito"
                                            value="Agregar al Carrito"
                                            onClick={() => handleClickAgregarAlCarrito(menu)}
                                            disabled={menu.mensaje === "NO DISPONIBLE" || !estaAbiertoRestaurante}
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
