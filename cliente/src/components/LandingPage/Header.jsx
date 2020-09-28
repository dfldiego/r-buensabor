import React, { Fragment } from 'react';
import BuenSaborLogo from "../../assets/img/logoBuenSabor.png";
import '../../assets/css/landingPage.css';

const Header = () => {
    return (
        <Fragment>
            <header className="header inicio">
                <div className="contenedor">
                    <div className="navbar">
                        <a href="#">
                            <img src={BuenSaborLogo} alt="Logotipo Buen Sabor" />
                        </a>
                        <nav className="nav">
                            <a href="#">Inicio</a>
                            <a href="#">Productos</a>
                            <a href="#">Iniciar Sesion</a>
                        </nav>
                    </div>
                    <h1>Venta de Casas y Departamentos Exclusivos de Lujo</h1>
                </div>
            </header>
        </Fragment>
    )
}

export default Header
