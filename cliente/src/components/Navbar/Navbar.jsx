import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import BuenSaborLogo from "../../assets/img/logoBuenSabor.png";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
//importamos componentes
import ModalContainer from '../ModalContainer/ModalContainer';
import Login from '../auth/Login';
import Register from '../auth/Register';

// Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {
    abrirCerrarModalAction,
    estaLogueadoAction,
} from '../../actions/homeActions';

const Navbar = () => {

    //useState locales
    const [openModal, setOpenModal] = useState(null);

    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    const estaLogueado_callAction = () => dispatch(estaLogueadoAction());

    let estaLogueado_token = useSelector(state => state.home.token);
    let estaLogueado_estado = useSelector(state => state.home.esta_logueado);

    useEffect(() => {
        estaLogueado_callAction()
    }, [estaLogueado_token, estaLogueado_estado]);


    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    const abrir_modal_state_store = useSelector(state => state.home.abrir_modal);
    const abrir_registrate_state_store = useSelector(state => state.home.abrir_registrarse);
    const esta_logueado_state_store = useSelector(state => state.home.esta_logueado);

    // manda llamar el action de homeActions
    const abrir_cerrar_Modal = (estado_modal) => dispatch(abrirCerrarModalAction(estado_modal));

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
        // eslint-disable-next-line
    }, [abrir_modal_state_store, esta_logueado_state_store])

    return (
        <Fragment>
            <div className="navbar contenedor">
                <Link to={"/"}>
                    <img src={BuenSaborLogo} alt="Logotipo Buen Sabor" />
                </Link>
                <nav className="nav">
                    {
                        esta_logueado_state_store ?
                            <Link to={"/admin"}>Admin</Link>
                            :
                            null
                    }
                    {esta_logueado_state_store ? <Link to={"/catalogo"}>Productos</Link> : null}
                    {
                        esta_logueado_state_store ?
                            <FaUserCircle className="usercircle" />
                            :
                            <Link
                                to={"#"}
                                onClick={e => handleClick_abrir_modal()}
                            >Ingresar</Link>
                    }

                </nav>
            </div>
            {abrir_modal_state_store ?
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
        </Fragment>
    )
}

export default Navbar
