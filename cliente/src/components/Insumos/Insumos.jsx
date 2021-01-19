import React, { Fragment, useState, useEffect } from 'react';
import './Insumos.css';

import ModalContainer from '../ModalContainer/ModalContainer';
import CreateInsumos from '../Insumos/CreateInsumos';
import GetInsumos from '../Insumos/GetInsumos';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarInsumoAction,
    obtenerInsumoBuscadorAction,
} from '../../actions/adminActions';

const Insumos = () => {

    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState('');

    const dispatch = useDispatch();

    const abrir_cerrar_agregarInsumo = estadoAgregarInsumo => dispatch(abrirCerrarAgregarInsumoAction(estadoAgregarInsumo));
    const cargarInsumo = (indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerInsumoBuscadorAction(indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda));
    const busquedaInsumo = (indexPrimerUsuario, limit, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerInsumoBuscadorAction(indexPrimerUsuario, limit, paginaCorriente_state, palabraBusqueda));

    const modalAgregarInsumo = useSelector(state => state.admin.abrir_agregar_insumo);
    const recargarTablaInsumo = useSelector(state => state.admin.insumo_eliminar);
    const limite_state = useSelector(state => state.admin.limite);
    let paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);
    let palabraBuscar_state = useSelector(state => state.admin.palabraBuscar);

    useEffect(() => {
        cargarInsumo(0, limite_state, paginaCorriente_state, palabraBuscar_state);

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
        setBuscador(e.target.value);
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        paginaCorriente_state = 0;
        busquedaInsumo(0, limite_state, paginaCorriente_state, buscador);
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
                            name="buscador"
                            className="input_buscador"
                            onChange={handleChangeBuscador}
                            value={buscador}
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
