import React, { Fragment, useEffect } from 'react';
import '../../assets/css/styles.css';
import './Catalogo.css';

import Navbar from '../Navbar/Navbar';

import { useSelector, useDispatch } from 'react-redux'
import {
    obtenerCategoriasAction,
} from '../../actions/adminActions';

const Catalogo = () => {

    const dispatch = useDispatch();

    const consultar_categorias = () => dispatch(obtenerCategoriasAction());

    const categorias = useSelector(state => state.admin.categorias);
    console.log(categorias);

    useEffect(() => {
        consultar_categorias();

        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <div className="fondo-negro">
                <Navbar />
            </div>

            <div className="catalogo seccion contenedor">
                <div className="row_catalogo">
                    {
                        categorias.map(categoria => (
                            <div
                                className="col_2_catalogo"
                                key={categoria._id}
                            >
                                {
                                    categoria.name === "pizza" ?
                                        <img src={require('../../assets/img/pizza.jpg')} alt="pizza" />
                                        : categoria.name === "Hamburguesas" ?
                                            <img src={require('../../assets/img/hamburguesa.jpg')} alt="hamburguesa" />
                                            : categoria.name === "Postres" ?
                                                <img src={require('../../assets/img/postres.jpg')} alt="postres" />
                                                : categoria.name === "Pescados" ?
                                                    <img src={require('../../assets/img/pescado.jpg')} alt="pescado" />
                                                    : null
                                }
                                <h4>{categoria.name}</h4>
                            </div>
                        ))
                    }
                </div>


            </div>
        </Fragment>
    );
}

export default Catalogo;