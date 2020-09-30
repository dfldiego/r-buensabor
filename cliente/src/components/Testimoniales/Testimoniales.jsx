import React, { Fragment } from 'react';
import '../../assets/css/styles.css';
import './Testimoniales.css';

const Testimoniales = () => {
    return (
        <Fragment>
            <section className="testimonial seccion contenedor">
                <h2 className="fw-300 centrar-texto">Nuestra Comunidad</h2>
                <div className="row">
                    <div className="col-4">
                        <i className="fa fa-quote-left"></i>
                        <p>¡Muy buen servicio! y muy rápidos para atender. Los recomiendo mucho.</p>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <img src={require('../../assets/img/user1.png')} alt="petilu" />
                        <h4>Ludmila</h4>
                    </div>
                    <div className="col-4">
                        <i className="fa fa-quote-left"></i>
                        <p>Muy rica la comida, en especial la pizza especial. Totalmente recomendado.</p>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <img src={require('../../assets/img/user2.png')} alt="gustavo" />
                        <h4>Gustavo</h4>
                    </div>
                    <div className="col-4">
                        <i className="fa fa-quote-left"></i>
                        <p>Recomiento el Buen Sabor, rapida atención y la comida es muy rica.</p>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <img src={require('../../assets/img/user3.png')} alt="karim" />
                        <h4>Karim</h4>
                    </div>
                    <div className="col-4">
                        <i className="fa fa-quote-left"></i>
                        <p>Recomiento el Buen Sabor, pedí unas empanadas de carnes. Muy recomendado</p>
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                        <img src={require('../../assets/img/user4.png')} alt="flor" />
                        <h4>Florencia</h4>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Testimoniales
