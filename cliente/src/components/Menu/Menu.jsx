import React, { Fragment, useState, useEffect } from 'react';
import './Menu.css';

import ModalContainer from '../ModalContainer/ModalContainer';
import CreateMenu from '../Menu/CreateMenu';
import GetMenu from '../Menu/GetMenu';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarMenuAction,
} from '../../actions/adminActions';

const Menu = () => {

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const abrir_cerrar_btn_agregar = estadoAgregarMenu => dispatch(abrirCerrarAgregarMenuAction(estadoAgregarMenu));

    const modalAgregarMenu = useSelector(state => state.admin.abrir_agregar_menu);

    const handleClick_abrir_agregar_menu = e => {
        e.preventDefault();

        if (openModal === false) {
            setOpenModal(true);
            abrir_cerrar_btn_agregar(true);
        } else {
            closeModal();
            abrir_cerrar_btn_agregar(false);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // le pasa el state principal al state local
    useEffect(() => {
        setOpenModal(modalAgregarMenu);
        // eslint-disable-next-line
    }, [modalAgregarMenu])

    return (
        <Fragment>
            <div className="container">
                <div className="row one">
                    <div>
                        <button
                            href="#"
                            onClick={handleClick_abrir_agregar_menu}
                        >Agregar Menu</button>
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
                <GetMenu />
            </div>
            { modalAgregarMenu ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    <CreateMenu />
                </ModalContainer>
                : null
            }
        </Fragment>
    )
}

export default Menu;
