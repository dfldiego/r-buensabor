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
    obtenerUsuariosBuscadorAction,
} from '../../actions/adminActions';

function Usuario() {

    //useState locales
    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState('');

    const dispatch = useDispatch();

    // enviar a store
    const abrir_cerrar_agregarUsuario = estadoAgregarUsuario => dispatch(abrirCerrarAgregarUsuarioAction(estadoAgregarUsuario));
    const busqueda_usuario = (indexPrimerUsuario, limit, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerUsuariosBuscadorAction(indexPrimerUsuario, limit, paginaCorriente_state, palabraBusqueda));
    const cargarUsuarios = (indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerUsuariosBuscadorAction(indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda))

    // recibir de store
    const modalAgregarUsuario = useSelector(state => state.admin.abrir_agregar_usuario);
    const recargarTablaUsuariosAlEditar = useSelector(state => state.admin.usuario_editar);
    const recargarTablaUsuarios = useSelector(state => state.admin.usuario_eliminar);
    const limite_state = useSelector(state => state.admin.limite);
    let paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);
    let palabraBuscar_state = useSelector(state => state.admin.palabraBuscar);
    let desde_state = useSelector(state => state.admin.desde);

    useEffect(() => {
        cargarUsuarios(desde_state, limite_state, paginaCorriente_state, palabraBuscar_state);

        // eslint-disable-next-line
    }, [recargarTablaUsuariosAlEditar, modalAgregarUsuario]);

    useEffect(() => {
        cargarUsuarios(0, limite_state, paginaCorriente_state, palabraBuscar_state);

        // eslint-disable-next-line
    }, [recargarTablaUsuarios]);

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

    const handleChangeBuscador = e => {
        setBuscador(e.target.value);
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        paginaCorriente_state = 0;
        busqueda_usuario(0, limite_state, paginaCorriente_state, buscador);
    }

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
