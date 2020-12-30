import React, { Fragment } from 'react';
import '../../assets/css/styles.css';
import './Catalogo.css';

import Navbar from '../Navbar/Navbar';


const Catalogo = () => {



    return (
        <Fragment>
            <div className="fondo-negro">
                <Navbar />
            </div>

            <div class="catalogo seccion contenedor">
                <div className="row_catalogo">
                    <div className="col_2_catalogo">
                        <img src={require('../../assets/img/pizza.jpg')} alt="pizza" />
                        <h4>Pizza</h4>
                    </div>
                    <div className="col_2_catalogo">
                        <img src={require('../../assets/img/pizza.jpg')} alt="pizza" />
                        <h4>Pizza</h4>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Catalogo;