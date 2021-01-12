import React, { Fragment, useState, useEffect } from 'react';
import './Insumos.css';

import ModalContainer from '../ModalContainer/ModalContainer';
import CreateInsumos from '../Insumos/CreateInsumos';
import GetInsumos from '../Insumos/GetInsumos';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarInsumoAction,
    obtenerInsumoBuscadorAction,
    obtenerInsumosAction,
} from '../../actions/adminActions';

const Insumos = () => {

    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState({
        busqueda: '',
    });

    const { busqueda } = buscador;

    const dispatch = useDispatch();

    const abrir_cerrar_agregarInsumo = estadoAgregarInsumo => dispatch(abrirCerrarAgregarInsumoAction(estadoAgregarInsumo));
    const cargarInsumo = () => dispatch(obtenerInsumosAction());
    const busquedaInsumo = palabraBusqueda => dispatch(obtenerInsumoBuscadorAction(palabraBusqueda));

    const modalAgregarInsumo = useSelector(state => state.admin.abrir_agregar_insumo);
    const recargarTablaInsumo = useSelector(state => state.admin.insumo_eliminar);
    const recargarTablaInsumoAlEditar = useSelector(state => state.admin.insumo_editar);

    useEffect(() => {
        if (recargarTablaInsumoAlEditar === null) {
            cargarInsumo();
        }

        // eslint-disable-next-line
    }, [recargarTablaInsumoAlEditar]);

    useEffect(() => {
        cargarInsumo();

        // eslint-disable-next-line
    }, [recargarTablaInsumo]);

    const handleClick_abrir_agregar_insumo = e => {
        e.preventDefault();

        if (openModal === false) {
            setOpenModal(true);
            abrir_cerrar_agregarInsumo(true);
        } else {
            closeModal();
            abrir_cerrar_agregarInsumo(false);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // le pasa el state principal al state local
    useEffect(() => {
        setOpenModal(modalAgregarInsumo);

        // eslint-disable-next-line
    }, [modalAgregarInsumo])

    const handleChangeBuscador = e => {
        setBuscador({
            ...buscador,
            [e.target.name]: e.target.value
        });
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        busquedaInsumo(buscador);
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row one">
                    <div>
                        <button
                            href="#"
                            onClick={handleClick_abrir_agregar_insumo}
                        >Agregar Insumo</button>
                    </div>
                    <div className="buscador">
                        <input
                            type="text"
                            name="busqueda"
                            className="input_buscador"
                            onChange={handleChangeBuscador}
                            value={busqueda}
                        />

                        <button
                            href="#"
                            className="button_buscador"
                            onClick={handleClick_buscador}
                        >Buscar</button>
                    </div>
                </div>
                <GetInsumos />
            </div>
            { modalAgregarInsumo ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    <CreateInsumos />
                </ModalContainer>
                : null
            }
        </Fragment>
    )
}

export default Insumos
