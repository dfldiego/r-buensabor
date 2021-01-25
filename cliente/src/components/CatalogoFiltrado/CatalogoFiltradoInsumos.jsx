import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import '../Catalogo/Catalogo.css';
import './CatalogoFiltrado.css';

import Navbar from '../Navbar/Navbar';
import ModalContainer from '../ModalContainer/ModalContainer';
import MenuDetalle from '../CatalogoFiltrado/MenuDetalle';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerInsumosAction,
} from '../../actions/adminActions';
import {
    abrirCerrarDetalleMenuAction,
} from '../../actions/catalogoActions';

const CatalogoFiltradoInsumos = ({ name }) => {

    const [insumoFiltrado, setInsumoFiltrado] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const abrirModalMenuDetalle = (estadoDetalleMenu) => dispatch(abrirCerrarDetalleMenuAction(estadoDetalleMenu));
    const consultarInsumos = () => dispatch(obtenerInsumosAction());

    const modalMenuDetalle = useSelector(state => state.catalogo.abrir_detalle_menu);
    const insumos = useSelector(state => state.admin.insumos);
    const categoriaInsumoPadre = useSelector(state => state.catalogo.categoria_insumo_padre);
    /**
     * 
     * 1) tengo la categoriaInsumo del padre.
     * 2) cuando cargue la pagina debo ejecutar un metodo que me traiga todos los productos(insumos) con categoria insumo padre.
     * 3) mostrar todos los insumos con ese padre.
     */

    const filtrarInsumosPorPadre = categoriaInsumoPadre => {
        const insumosPorPadre = insumos.filter(insumo => insumo.category._id === categoriaInsumoPadre._id);
        console.log(insumosPorPadre);
        setInsumoFiltrado(insumosPorPadre);
    }

    useEffect(() => {
        consultarInsumos()
            .then(() => filtrarInsumosPorPadre(categoriaInsumoPadre))

        // eslint-disable-next-line
    }, [])

    const handleClickAbrirModalDetalle = (insumoId) => {
        console.log(insumoId);

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
    console.log(insumoFiltrado);

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
                            insumos.map(insumo => (
                                <div
                                    className="col_3"
                                    key={insumo._id}
                                >
                                    <img
                                        src={`http://localhost:4000/api/image/products/${insumo.img}`}
                                        alt={insumo.description}
                                        onClick={() => handleClickAbrirModalDetalle(insumo._id)}
                                    />
                                    <div className="titulos">
                                        <h3 className="fw-300">{insumo.description}</h3>
                                        <h4 className="price">${insumo.sale_price}</h4>
                                    </div>
                                    <div className="botones">
                                        <input
                                            type="button"
                                            className="btn_ver_detalle"
                                            value="Ver Detalle"
                                            onClick={() => handleClickAbrirModalDetalle(insumo._id)}
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

export default CatalogoFiltradoInsumos
/**
 *
 */