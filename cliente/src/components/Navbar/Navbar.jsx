import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import BuenSaborLogo from "../../assets/img/logoBuenSabor.png";
import './Navbar.css';
import { Link } from 'react-router-dom';

//importamos componentes
import ModalContainer from '../ModalContainer/ModalContainer';
import Login from '../auth/Login';
import Register from '../auth/Register';

// Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {
    abrirCerrarModalAction
} from '../../actions/homeActions';

const Navbar = () => {

    //useState locales
    const [openModal, setOpenModal] = useState(null);

    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    const abrir_modal_state_store = useSelector(state => state.home.abrir_modal);
    const abrir_registrate = useSelector(state => state.home.abrir_registrarse);
    /* console.log(abrir_registrate); */

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
    }, [abrir_modal_state_store])

    return (
        <Fragment>
            <div className="navbar">
                <Link to={"/"}>
                    <img src={BuenSaborLogo} alt="Logotipo Buen Sabor" />
                </Link>
                <nav className="nav">
                    <Link to={"/"}>Inicio</Link>
                    <Link to={"#"}>Productos</Link>
                    <Link
                        to={"#"}
                        onClick={e => handleClick_abrir_modal()}
                    >Ingresar</Link>
                </nav>
            </div>
            {abrir_modal_state_store ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    {
                        abrir_registrate ?
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
