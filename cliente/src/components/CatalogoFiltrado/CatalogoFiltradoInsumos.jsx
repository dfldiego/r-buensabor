import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import '../Catalogo/Catalogo.css';
import './CatalogoFiltrado.css';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

import Navbar from '../Navbar/Navbar';
import ModalContainer from '../ModalContainer/ModalContainer';
import MenuDetalle from '../CatalogoFiltrado/MenuDetalle';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarDetalleMenuAction,
    guardarInsumoDetalleAction,
    obtenerDatosUsuarioAction,
} from '../../actions/catalogoActions';
import {
    agregarMenuACarritoAction,
} from '../../actions/homeActions';

const CatalogoFiltradoInsumos = ({ name }) => {

    // redireccionar a la pagina principal una vez que editamos el producto
    const history = useHistory();

    const [insumoFiltrado, setInsumoFiltrado] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const abrirModalMenuDetalle = (estadoDetalleMenu) => dispatch(abrirCerrarDetalleMenuAction(estadoDetalleMenu));
    const guardarInsumo = (insumo) => dispatch(guardarInsumoDetalleAction(insumo));
    const agregarInsumoACarrito = orden => dispatch(agregarMenuACarritoAction(orden));
    const obtenerDatosUsuario = () => dispatch(obtenerDatosUsuarioAction());

    const modalMenuDetalle = useSelector(state => state.catalogo.abrir_detalle_menu);
    const insumos = useSelector(state => state.admin.insumos);
    const categoriaInsumoPadre = useSelector(state => state.catalogo.categoria_insumo_padre);
    const mensaje = useSelector(state => state.catalogo.mensaje);
    const estaAbiertoRestaurante = useSelector(state => state.catalogo.estadoHorariosRestaurante);
    const errorCatalogo = useSelector(state => state.catalogo.error);
    const usuarioData = useSelector(state => state.catalogo.usuarioData);

    useEffect(() => {
        const filtrarInsumosPorPadre = categoriaInsumoPadre => {
            const insumosPorPadre = insumos.filter(insumo => (
                insumo.is_supplies ?
                    null
                    :
                    insumo.category._id === categoriaInsumoPadre._id
            ));
            setInsumoFiltrado(insumosPorPadre)
        }

        if (insumos.length > 0) {
            filtrarInsumosPorPadre(categoriaInsumoPadre)
        }
        obtenerDatosUsuario();

        // eslint-disable-next-line
    }, []);

    const handleClickAbrirModalDetalle = (insumo) => {
        guardarInsumo(insumo);

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

        agregarInsumoACarrito(menu);
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
                        insumoFiltrado ?
                            insumoFiltrado.map(insumo => (
                                <div
                                    className="col_3"
                                    key={insumo._id}
                                >
                                    <img
                                        src={`http://localhost:4000/api/image/products/${insumo.img}`}
                                        alt={insumo.description}
                                        className="imagen_detalle"
                                        onClick={() => handleClickAbrirModalDetalle(insumo)}
                                    />

                                    <div className="titulos">
                                        <h3 className="fw-300">{insumo.description}</h3>
                                        {
                                            insumo.current_stock === 0 || !estaAbiertoRestaurante ?
                                                <h3 className="color_rojo">No Disponible</h3>
                                                : null
                                        }
                                        <h4 className="price">${insumo.price}</h4>
                                    </div>

                                    <div className="botones">
                                        <input
                                            type="button"
                                            className="btn_ver_detalle"
                                            value="Ver Detalle"
                                            onClick={() => handleClickAbrirModalDetalle(insumo)}
                                        />
                                        <input
                                            type="button"
                                            className="btn_agregar_carrito"
                                            onClick={() => handleClickAgregarAlCarrito(insumo)}
                                            value="Agregar al Carrito"
                                            disabled={insumo.current_stock === 0 || !estaAbiertoRestaurante}
                                        />
                                    </div>
                                </div>
                            ))
                            :
                            null
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

export default CatalogoFiltradoInsumos
