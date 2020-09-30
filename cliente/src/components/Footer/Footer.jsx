import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="contenedor">
                <div className="row">
                    <div className="footer__col__1">
                        <img src={require('../../assets/img/logoBuenSabor.png')} alt="logo" />
                        <p>Nuestro propósito es dar los productos mejores <br></br>calificados al cliente, traerlos de vuelta y hacerlos felices. </p>
                    </div>
                    <div className="footer__col__2">
                        <h3>Enlaces útiles</h3>
                        <ul>
                            <li>Cupones</li>
                            <li>Blog</li>
                            <li>Retornar a la policia</li>
                            <li>Unirse a la afiliación</li>
                        </ul>
                    </div>
                    <div className="footer__col__3">
                        <h3>Síguenos</h3>
                        <ul>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                            <li>Youtube</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p class="copyright">Copyright &copy; 2020 - www.buenSabor.com</p>
            </div>
        </div >
    )
}

export default Footer
