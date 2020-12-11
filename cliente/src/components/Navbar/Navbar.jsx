import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import BuenSaborLogo from "../../assets/img/logoBuenSabor.png";
import nouser from "../../assets/img/sinuser.png";
import './Navbar.css';
import { Link } from 'react-router-dom';
//importamos componentes
import ModalContainer from '../ModalContainer/ModalContainer';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Perfil from '../Perfil/Perfil';
import { useHistory } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {
    abrirCerrarModalAction,
    estaLogueadoAction,
    cerrarSesionAction,
    perfilAction,
} from '../../actions/homeActions';

const Navbar = () => {
    let history = useHistory();
    //useState locales
    const [openModal, setOpenModal] = useState(null);
    const [openModalPerfil, setOpenModalPerfil] = useState(null);
    const [openDropDown, setOpenDropDown] = useState(false);

    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    // manda llamar el action de homeActions
    const estaLogueado_callAction = () => dispatch(estaLogueadoAction());
    const abrir_cerrar_Modal = estado_modal => dispatch(abrirCerrarModalAction(estado_modal));
    const cerrar_sesion_callAction = () => dispatch(cerrarSesionAction());
    const perfil_callAction = estadoPerfil => dispatch(perfilAction(estadoPerfil));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    const abrir_modal_state_store = useSelector(state => state.home.abrir_modal);
    const abrir_registrate_state_store = useSelector(state => state.home.abrir_registrarse);
    const esta_logueado_state_store = useSelector(state => state.home.esta_logueado);
    const estaLogueado_token = useSelector(state => state.home.token);
    const estaLogueado_estado = useSelector(state => state.home.esta_logueado);
    const rol_store = useSelector(state => state.home.rol);
    const abrir_modal_perfil_store = useSelector(state => state.home.abrir_modal_perfil);

    useEffect(() => {
        setOpenDropDown(false);
        estaLogueado_callAction()
        // eslint-disable-next-line
    }, [estaLogueado_token, estaLogueado_estado]);

    // cuando el usuario haga click en iniciar sesion -> Abrir modal
    const handleClick_abrir_modal = e => {
        // si se hizo click, cambiar a true openModal
        if (openModal === false || openModal === null) {
            setOpenModal(true);
            abrir_cerrar_Modal(true);
        } else {
            closeModal();
            abrir_cerrar_Modal(false);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // le pasa el state principal al state local
    useEffect(() => {
        setOpenModal(abrir_modal_state_store);

        if (!esta_logueado_state_store) {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [abrir_modal_state_store, esta_logueado_state_store])

    const handleclick_openDropDown = e => {
        e.preventDefault();
        if (!openDropDown) {
            setOpenDropDown(true);
        } else {
            setOpenDropDown(false);
        }
    }

    const handleClick_cerrar_sesion = async (e) => {
        e.preventDefault();
        await cerrar_sesion_callAction();
    }

    const handleclick_openPerfil = e => {
        e.preventDefault();
        // si se hizo click, cambiar a true openModal
        if (openModalPerfil === false || openModalPerfil === null) {
            setOpenModalPerfil(true);
            perfil_callAction(true);
        } else {
            closeModalPerfil();
            perfil_callAction(false);
        }
    }

    const closeModalPerfil = () => {
        setOpenModalPerfil(false);
    }

    useEffect(() => {
        setOpenModalPerfil(abrir_modal_perfil_store);
        // eslint-disable-next-line
    }, [abrir_modal_perfil_store])

    return (
        <Fragment>
            <div className="navbar contenedor">
                <Link to={"/"}>
                    <img src={BuenSaborLogo} alt="Logotipo Buen Sabor" />
                </Link>
                <nav className="nav">
                    <ul>
                        {
                            esta_logueado_state_store && rol_store === 'ADMIN_ROLE' ?
                                <li><Link to={"/admin"}>Admin</Link></li>
                                :
                                null
                        }
                        {
                            esta_logueado_state_store ?
                                <li><Link to={"/catalogo"}>Productos</Link></li>
                                :
                                null
                        }
                        {
                            esta_logueado_state_store ?
                                <div>
                                    <li><Link to={'#'}>
                                        <img
                                            src={nouser}
                                            alt="imagen sin usuario"
                                            className="tamañoImagen"
                                            onClick={handleclick_openDropDown}
                                        />
                                    </Link></li>
                                    {
                                        openDropDown ?
                                            <div className="sub-menu">
                                                <li>
                                                    <Link
                                                        to={'#'}
                                                        className="sub-menu-li"
                                                        onClick={handleclick_openPerfil}
                                                    >Perfil</Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={'#'}
                                                        className="sub-menu-li"
                                                        onClick={handleClick_cerrar_sesion}
                                                    >Cerrar Sesión
                                                    </Link>
                                                </li>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                                :
                                <li><Link
                                    to={"#"}
                                    onClick={e => handleClick_abrir_modal()}
                                >Ingresar</Link></li>
                        }
                    </ul>
                </nav>
            </div>
            {
                abrir_modal_state_store ?
                    <ModalContainer
                        openModal={openModal}
                        closeModal={closeModal}
                    >
                        {
                            abrir_registrate_state_store ?
                                <Register />
                                :
                                <Login />
                        }

                    </ModalContainer>
                    : null
            }
            {
                abrir_modal_perfil_store ?
                    <ModalContainer
                        openModal={openModalPerfil}
                        closeModal={closeModalPerfil}
                    >
                        <Perfil />
                    </ModalContainer>
                    : null
            }
        </Fragment >
    )
}

export default Navbar
