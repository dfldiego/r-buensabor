import React, { Fragment } from 'react';
import BuenSaborLogo from "../../assets/img/logoBuenSabor.png";
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Fragment>
            <div className="navbar">
                <Link to="/">
                    <img src={BuenSaborLogo} alt="Logotipo Buen Sabor" />
                </Link>
                <nav className="nav">
                    <Link to="/">Inicio</Link>
                    <Link to="#">Productos</Link>
                    <Link to="#">Iniciar Sesion</Link>
                </nav>
            </div>
        </Fragment>
    )
}

export default Navbar
