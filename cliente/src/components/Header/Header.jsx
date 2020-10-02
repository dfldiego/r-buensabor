import React, { Fragment } from 'react';
import '../../assets/css/styles.css';
import './Header.css'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Header = () => {
    return (
        <Fragment>
            <header className="header inicio">
                <div className="contenedor">
                    <Navbar />

                    <div className="row">
                        <div className="col-2">
                            <h1>¡Volá con tu delivery online!</h1>
                            <Link to={"#"} className="btn">Explorar Ahora &#8594;</Link>
                        </div>
                        <div className="col-2">
                            {/* <img src={LogoHamburguesa} alt="imagen principal" /> */}
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header
