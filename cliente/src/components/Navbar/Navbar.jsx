import React, { Fragment, useEffect, useState } from 'react';
import '../../assets/css/styles.css';
import BuenSaborLogo from "../../assets/img/logoBuenSabor.png";
import './Navbar.css';
import { Link } from 'react-router-dom';

//importamos componentes
import ModalContainer from '../ModalContainer/ModalContainer';

// Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {
    abrirModalAction,
} from '../../actions/homeActions';

const Navbar = () => {

    //useState locales
    const [openModal, setOpenModal] = useState(false);

    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    // acceder al state del store
    const abrir_modal_state_store = useSelector(state => state.home.abrir_modal);


    // manda llamar el action de homeActions
    const abrirModal = (estado_modal) => dispatch(abrirModalAction(estado_modal));

    // cuando el usuario haga click en iniciar sesion -> Abrir modal
    const handleClick_abrir_modal = e => {
        // si se hizo click, cambiar a true openModal
        if (openModal === false) {
            setOpenModal(true);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // si se hizo click en iniciar Sesion -> abrir modal.
    useEffect(() => {
        if (openModal === true) abrirModal(openModal);
        // eslint-disable-next-line
    }, [openModal])

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
                    >Iniciar Sesion</Link>
                </nav>
            </div>
            {abrir_modal_state_store ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    <p>Contenido del modal</p>
                </ModalContainer>
                : null
            }
        </Fragment>
    )
}

export default Navbar
