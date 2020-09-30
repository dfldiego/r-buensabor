import React, { Fragment } from 'react';
import '../../assets/css/styles.css';
import './DosColumnas.css';

const DosColumnas = () => {
    return (
        <Fragment>
            <section className="contenedor seccion dos-columnas">
                <div className="row">
                    <img src={require('../../assets/img/gentecomiendo.png')} alt="gente comiendo" />
                    <div>
                        <h2 className="fw-300 centrar-texto">El Buen Sabor que satisface tus necesidades</h2>
                        <p>Amamos la comida tanto como vos y por eso queremos llevar a tu mesa, tu comida favorita directamente desde la cocina del Buen Sabor. ¿La mejor parte? ¡Te la llevamos donde estés!. <br /> Ingresá tu dirección, seleccioná tu comida favorita y listo. ¡Pedir delivery de comida nunca había sido tan sencillo, lo único difícil será decidir qué comer!</p>
                    </div>
                </div>
            </section>

        </Fragment >
    )
}

export default DosColumnas
