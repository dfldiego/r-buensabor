import React, { Fragment, useState, useEffect } from 'react';
import './Insumos.css';

import ModalContainer from '../ModalContainer/ModalContainer';
import CreateInsumos from '../Insumos/CreateInsumos';
import GetInsumos from '../Insumos/GetInsumos';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarInsumoAction,
} from '../../actions/adminActions';

const Insumos = () => {

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const abrir_cerrar_agregarInsumo = estadoAgregarInsumo => dispatch(abrirCerrarAgregarInsumoAction(estadoAgregarInsumo));

    const modalAgregarInsumo = useSelector(state => state.admin.abrir_agregar_insumo);

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
                        />

                        <button
                            href="#"
                            className="button_buscador"
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
