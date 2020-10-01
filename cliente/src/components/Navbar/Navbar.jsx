import React, { Fragment, useState } from 'react';
import '../../assets/css/styles.css';
import BuenSaborLogo from "../../assets/img/logoBuenSabor.png";
import './Navbar.css';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {
    abrirModalAction,
} from '../../actions/homeActions';

const Navbar = () => {

    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    // manda llamar el action de homeActions
    const abrirModal = () => dispatch(abrirModalAction());

    //useState locales
    const [openModal, setOpenModal] = useState(false);

    // cuando el usuario haga click en iniciar sesion -> Abrir modal
    const handleClick_abrir_modal = e => {
        abrirModal();
    }

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
                        onClick={handleClick_abrir_modal}
                    >Iniciar Sesion</Link>
                </nav>
            </div>
        </Fragment>
    )
}

export default Navbar
