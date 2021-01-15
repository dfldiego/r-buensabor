import React, { Fragment, useState, useEffect } from 'react';
import './Menu.css';

import ModalContainer from '../ModalContainer/ModalContainer';
import CreateMenu from '../Menu/CreateMenu';
import GetMenu from '../Menu/GetMenu';

import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarMenuAction,
    obtenerMenuAction,
    obtenerMenusBuscadorAction,
} from '../../actions/adminActions';

const Menu = () => {

    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState({
        busqueda: '',
    });

    const { busqueda } = buscador;

    const dispatch = useDispatch();

    const abrir_cerrar_btn_agregar = estadoAgregarMenu => dispatch(abrirCerrarAgregarMenuAction(estadoAgregarMenu));
    const cargarmenus = (indexPrimerUsuario, limite_state, paginaCorriente_state) => dispatch(obtenerMenuAction(indexPrimerUsuario, limite_state, paginaCorriente_state));
    const busqueda_menus = palabraBusqueda => dispatch(obtenerMenusBuscadorAction(palabraBusqueda));

    const modalAgregarMenu = useSelector(state => state.admin.abrir_agregar_menu);
    const recargarTablaMenu = useSelector(state => state.admin.menu_eliminar);
    const recargarTablaMenuAlEditar = useSelector(state => state.admin.menu_editar);
    const limite_state = useSelector(state => state.admin.limite);
    const paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);

    // modalAgregarMenu -> para que al agregar un menu se actualice en la tabla la categoria.
    useEffect(() => {
        cargarmenus(0, limite_state, paginaCorriente_state);

        // eslint-disable-next-line
    }, [recargarTablaMenu, recargarTablaMenuAlEditar, modalAgregarMenu]);

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
        setBuscador({
            ...buscador,
            [e.target.name]: e.target.value
        });
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        busqueda_menus(buscador);
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
