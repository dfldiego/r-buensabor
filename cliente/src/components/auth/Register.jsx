import React from 'react';
import './Login.css';

const Register = () => {

    return (

        <div className="login">

            <div className="login_container" >

                {/***********************
             ******* REGISTRARSE*****
            *************************/}


                <div className="form-container sign-in-container">

                    <form>

                        <h1>Crear Cuenta</h1>

                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        </div>

                        <span>o usa tu email para la registracion</span>

                        <input type="text" placeholder="Nombre" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />

                        <button>Registrate</button>
                        <button className="volver">Volver</button>

                    </form>

                </div>

                {/** OVERLAY **/}

                <div className="overlay-container">

                    <div className="overlay">

                        {/** LEFT OVERLAY PANEL **/}

                        <div className="overlay-panel overlay-left">

                            <h1>¡Bienvenido de Vuelta!</h1>

                            <p>Para mantenerte conectado con nosotros por favor logueate con tu información personal</p>

                            <button
                                className="ghost"
                            >Iniciar Sesión</button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Register
