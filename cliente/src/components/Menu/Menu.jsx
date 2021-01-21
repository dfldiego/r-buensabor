import React, { Fragment, useState, useEffect } from 'react';
import './Menu.css';

import ModalContainer from '../ModalContainer/ModalContainer';
import CreateMenu from '../Menu/CreateMenu';
import GetMenu from '../Menu/GetMenu';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarMenuAction,
    obtenerMenusBuscadorAction,
} from '../../actions/adminActions';

const Menu = () => {

    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState('');

    const dispatch = useDispatch();

    const abrir_cerrar_btn_agregar = estadoAgregarMenu => dispatch(abrirCerrarAgregarMenuAction(estadoAgregarMenu));
    const cargarmenus = (indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerMenusBuscadorAction(indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda));
    const busqueda_menus = (indexPrimerUsuario, limit, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerMenusBuscadorAction(indexPrimerUsuario, limit, paginaCorriente_state, palabraBusqueda));

    const modalAgregarMenu = useSelector(state => state.admin.abrir_agregar_menu);
    const recargarTablaMenu = useSelector(state => state.admin.menu_eliminar);
    const recargarTablaMenuAlEditar = useSelector(state => state.admin.menu_editar);
    const limite_state = useSelector(state => state.admin.limite);
    let paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);
    let palabraBuscar_state = useSelector(state => state.admin.palabraBuscar);
    let desde_state = useSelector(state => state.admin.desde);

    useEffect(() => {
        cargarmenus(desde_state, limite_state, paginaCorriente_state, palabraBuscar_state);

        // eslint-disable-next-line
    }, [recargarTablaMenuAlEditar, modalAgregarMenu]);

    useEffect(() => {
        cargarmenus(0, limite_state, paginaCorriente_state, palabraBuscar_state);

        // eslint-disable-next-line
    }, [recargarTablaMenu]);

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

    const handleChangeBuscador = e => {
        setBuscador(e.target.value);
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        paginaCorriente_state = 0;
        busqueda_menus(0, limite_state, paginaCorriente_state, buscador);
    }

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
