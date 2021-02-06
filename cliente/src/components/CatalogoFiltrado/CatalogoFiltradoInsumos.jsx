import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import '../Catalogo/Catalogo.css';
import './CatalogoFiltrado.css';
import { v4 as uuidv4 } from 'uuid';

import Navbar from '../Navbar/Navbar';
import ModalContainer from '../ModalContainer/ModalContainer';
import MenuDetalle from '../CatalogoFiltrado/MenuDetalle';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerInsumosAction,
} from '../../actions/adminActions';
import {
    abrirCerrarDetalleMenuAction,
    guardarInsumoDetalleAction
} from '../../actions/catalogoActions';
import {
    agregarMenuACarritoAction,
} from '../../actions/homeActions';

const CatalogoFiltradoInsumos = ({ name }) => {

    const [insumoFiltrado, setInsumoFiltrado] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const abrirModalMenuDetalle = (estadoDetalleMenu) => dispatch(abrirCerrarDetalleMenuAction(estadoDetalleMenu));
    const consultarInsumos = () => dispatch(obtenerInsumosAction());
    const guardarInsumo = (insumo) => dispatch(guardarInsumoDetalleAction(insumo));
    const agregarInsumoACarrito = orden => dispatch(agregarMenuACarritoAction(orden));

    const modalMenuDetalle = useSelector(state => state.catalogo.abrir_detalle_menu);
    const insumos = useSelector(state => state.admin.insumos);
    const categoriaInsumoPadre = useSelector(state => state.catalogo.categoria_insumo_padre);

    const filtrarInsumosPorPadre = categoriaInsumoPadre => {
        console.log(categoriaInsumoPadre);
        console.log(insumos);
        const insumosPorPadre = insumos.filter(insumo => (
            insumo.is_supplies ?
                null
                :
                insumo.category._id === categoriaInsumoPadre._id
        ));
        setInsumoFiltrado(insumosPorPadre)
    }

    useEffect(() => {
        consultarInsumos()
        if (insumos.length > 0) {
            filtrarInsumosPorPadre(categoriaInsumoPadre)
        }

        // eslint-disable-next-line
    }, [])

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

    const handleClickAgregarAlCarrito = menu => {
        menu.uuid = uuidv4();
        agregarInsumoACarrito(menu);
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
                        insumoFiltrado ?
                            insumoFiltrado.map(insumo => (
                                <div
                                    className="col_3"
                                    key={insumo._id}
                                >
                                    {
                                        insumo.current_stock === 0 ?
                                            <img
                                                src={`http://localhost:4000/api/image/products/${insumo.img}`}
                                                alt={insumo.description}
                                                onClick={() => handleClickAbrirModalDetalle(insumo)}
                                                disabled
                                            />
                                            :
                                            <img
                                                src={`http://localhost:4000/api/image/products/${insumo.img}`}
                                                alt={insumo.description}
                                                onClick={() => handleClickAbrirModalDetalle(insumo)}
                                            />
                                    }

                                    <div className="titulos">
                                        <h3 className="fw-300">{insumo.description}</h3>
                                        <h4 className="price">${insumo.price}</h4>
                                    </div>

                                    <div className="botones">
                                        <input
                                            type="button"
                                            className="btn_ver_detalle"
                                            value="Ver Detalle"
                                            onClick={() => handleClickAbrirModalDetalle(insumo)}
                                        />
                                        {
                                            insumo.current_stock === 0 ?
                                                <input
                                                    type="button"
                                                    className="btn_agregar_carrito"
                                                    onClick={() => handleClickAgregarAlCarrito(insumo)}
                                                    value="Agregar al Carrito"
                                                    disabled
                                                />
                                                :
                                                <input
                                                    type="button"
                                                    className="btn_agregar_carrito"
                                                    onClick={() => handleClickAgregarAlCarrito(insumo)}
                                                    value="Agregar al Carrito"
                                                />
                                        }
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
