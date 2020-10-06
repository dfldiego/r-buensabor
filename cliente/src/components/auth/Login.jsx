import React from 'react';
import './Login.css';

//Actions de Redux
import {
    abrirCerrarModalAction
} from '../../actions/homeActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const dispatch = useDispatch();

    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarModalAction(nuevo_estado));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.home.abrir_modal);
    /* console.log(cerrar_modal_state_store); */


    /***********METODO QUE CIERRA MODAL: modifico el state *************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    return (

        <div className="login">

            <div className="login_container" >

                {/***********************
             ******* INICIAR SESION*****
            *************************/}

                <div className="form-container sign-in-container">

                    <form>

                        <h1>Inicia Sesión</h1>

                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        </div>

                        <span>o usa tu cuenta</span>

                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">¿Olvidaste tu contraseña?</a>
                        <button>Iniciar Sesión</button>
                        <button
                            className="volver"
                            onClick={cerrar_modal}
                        >Volver</button>

                    </form>

                </div>

                {/** OVERLAY **/}

                <div className="overlay-container">

                    <div className="overlay">

                        {/** RIGHT OVERLAY PANEL **/}

                        <div className="overlay-panel overlay-right">

                            <h1>¡Hola Amigo!</h1>

                            <p>Ingresá tus detalles personales y unete a nosotros</p>

                            <button
                                className="ghost"
                            >Registrate</button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login
