/* rfce */
import React, { Fragment, useState, useEffect } from 'react';
import './Usuario.css';

//importamos componentes
import ModalContainer from '../ModalContainer/ModalContainer';
import CrearUsuario from './CrearUsuario';
import GetUsuarios from './GetUsuarios';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarUsuarioAction,
} from '../../actions/adminActions';

function Usuario() {

    //useState locales
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    // enviar a store
    const abrir_cerrar_agregarUsuario = estadoAgregarUsuario => dispatch(abrirCerrarAgregarUsuarioAction(estadoAgregarUsuario));

    // recibir de store
    const modalAgregarUsuario = useSelector(state => state.admin.abrir_agregar_usuario);

    const handleClick_abrir_agregar_usuario = e => {
        e.preventDefault();

        if (openModal === false) {
            setOpenModal(true);
            abrir_cerrar_agregarUsuario(true);
        } else {
            closeModal();
            abrir_cerrar_agregarUsuario(false);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // le pasa el state principal al state local
    useEffect(() => {
        setOpenModal(modalAgregarUsuario);
        // eslint-disable-next-line
    }, [modalAgregarUsuario])

    console.log(openModal);
    return (
        <Fragment>
            <div className="container">
                <div className="row one">
                    <div>
                        <button
                            href="#"
                            onClick={handleClick_abrir_agregar_usuario}
                        >Agregar Usuario</button>
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
                <GetUsuarios />
            </div>
            { modalAgregarUsuario ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    <CrearUsuario />
                </ModalContainer>
                : null
            }
        </Fragment>
    )
}

export default Usuario
