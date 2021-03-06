import React, { Fragment } from 'react';
import '../../assets/css/styles.css';
import './Nosotros.css';

const Nosotros = () => {
    return (
        <Fragment>
            <section className="contenedor_nosotros seccion nosotros">
                <h2 className="fw-300 centrar-texto">Pasos a Seguir</h2>
                <div className="row_nosotros">
                    <div className="col-3">
                        <img src={require('../../assets/img/comida-rapida.svg')} alt="Icono elegi tu comida" />
                        <h3>1. Elegi tu comida</h3>
                        <p>Investigá a través de las distintas categorías de comida y elegí lo que mas te guste.</p>
                    </div>

                    <div className="col-3">
                        <img src={require('../../assets/img/dinero.svg')} alt="Icono hace tu pedido" />
                        <h3>2. Hacé tu pedido</h3>
                        <p>Es fácil y rápido. Una vez que dicidiste tu comida, podés pagar en la entrega o venir a retirarlo al local.</p>
                    </div>

                    <div className="col-3">
                        <img src={require('../../assets/img/moto.svg')} alt="Icono recibi tu pedido" />
                        <h3>3. Recibí tu pedido</h3>
                        <p>Nosotros te entregamos el pedido en tu puerta o te esperamos a que busques en nuestro local.</p>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Nosotros
