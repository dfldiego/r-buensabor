import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import BuenSaborLogo from "../../assets/img/logoBuenSabor.png";
import nouser from "../../assets/img/sinuser.png";
import cart from "../../assets/img/anadir-al-carrito.svg";
import './Navbar.css';
import { Link } from 'react-router-dom';
//importamos componentes
import ModalContainer from '../ModalContainer/ModalContainer';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Perfil from '../Perfil/Perfil';
import Carrito from '../Carrito/Carrito';
import { validarRol } from "../../helpers/helpers";
import { useHistory } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {
    abrirCerrarModalAction,
    estaLogueadoAction,
    cerrarSesionAction,
    perfilAction,
    abrirModalCarritoAction,
} from '../../actions/homeActions';

const Navbar = () => {
    let history = useHistory();
    //useState locales
    const [openModal, setOpenModal] = useState(false);
    const [openModalPerfil, setOpenModalPerfil] = useState(null);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [openModalCarrito, setOpenModalCarrito] = useState(false);
    const [isAdmin, setIsAdmin] = useState('loading');
    const [isCashier, setIsCashier] = useState('loading');
    const [isChef, setIsChef] = useState('loading');
    const [isSuper, setIsSuper] = useState('loading');
    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    // manda llamar el action de homeActions
    const estaLogueado_callAction = () => dispatch(estaLogueadoAction());
    const abrir_cerrar_Modal = estado_modal => dispatch(abrirCerrarModalAction(estado_modal));
    const cerrar_sesion_callAction = () => dispatch(cerrarSesionAction());
    const perfil_callAction = estadoPerfil => dispatch(perfilAction(estadoPerfil));
    const carrito_action = estadoCarrito => dispatch(abrirModalCarritoAction(estadoCarrito));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    const abrir_modal_state_store = useSelector(state => state.home.abrir_modal);
    const abrir_registrate_state_store = useSelector(state => state.home.abrir_registrarse);
    const esta_logueado_state_store = useSelector(state => state.home.esta_logueado);
    const estaLogueado_token = useSelector(state => state.home.token);
    const estaLogueado_estado = useSelector(state => state.home.esta_logueado);
    const AbrirModalCarrito = useSelector(state => state.home.abrir_modal_carrito);
    const abrir_modal_perfil_store = useSelector(state => state.home.abrir_modal_perfil);
    const MenusDeCarrito = useSelector(state => state.home.carrito);

    useEffect(() => {
        setOpenDropDown(false);
        estaLogueado_callAction();
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


    const validateRol = async () => {
        const isAdmin = await validarRol('ADMIN_ROLE');
        setIsAdmin(isAdmin);
        const isCashier = await validarRol('CASHIER_ROLE');
        setIsCashier(isCashier);
        const isChef = await validarRol('CHEF_ROLE');
        setIsChef(isChef);
        const isSuper = await validarRol('SUPER_ADMIN_ROLE');
        setIsSuper(isSuper);
    };
    validateRol();

    const handleClickAbrirCarrito = () => {
        // si se hizo click, cambiar a true openModal
        if (!openModalCarrito) {
            setOpenModalCarrito(true);
            carrito_action(true);
        } else {
            closeModalCarrito();
            carrito_action(false);
        }

    }

    const closeModalCarrito = () => {
        setOpenModalCarrito(false);
    }

    useEffect(() => {
        setOpenModalCarrito(AbrirModalCarrito);
        // eslint-disable-next-line
    }, [AbrirModalCarrito])

    return (
        <Fragment>
            <div className="navbar contenedor">
                <Link to={"/"}>
                    <img src={BuenSaborLogo} alt="Logotipo Buen Sabor" />
                </Link>
                <nav className="nav">
                    <ul className="barra__div">
                        {
                            isAdmin || isCashier || isChef || isSuper ?
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
                                    <li>
                                        <Link to={'#'}>
                                            <img
                                                src={nouser}
                                                alt="imagen sin usuario"
                                                className="tamañoImagen"
                                                onClick={handleclick_openDropDown}
                                            />
                                        </Link>
                                    </li>
                                    {
                                        openDropDown ?
                                            <div className="sub-menu">
                                                <li>
                                                    <input
                                                        type="button"
                                                        className="sub-menu-li"
                                                        onClick={handleclick_openPerfil}
                                                        value="Perfil"
                                                    />
                                                </li>
                                                <li>
                                                    <input
                                                        to={'#'}
                                                        className="sub-menu-li"
                                                        onClick={handleClick_cerrar_sesion}
                                                        defaultValue="Cerrar Sesión"
                                                    />
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
                        {
                            esta_logueado_state_store ?
                                <li>
                                    <p className="cart__count">{MenusDeCarrito.length}</p>
                                </li>
                                :
                                null
                        }
                        {
                            esta_logueado_state_store ?
                                <li>
                                    <Link to={'#'}>
                                        <img
                                            src={cart}
                                            alt="imagen carrito"
                                            className="tamañoImagen"
                                            onClick={e => handleClickAbrirCarrito()}
                                        />
                                    </Link>
                                </li>
                                :
                                null
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
                AbrirModalCarrito ?
                    <ModalContainer
                        openModal={openModalCarrito}
                        closeModal={closeModalCarrito}
                    >
                        <Carrito />
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
