import React from 'react';
import './Login.css';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarModalAction,
    abrirRegistrarseAction,
} from '../../actions/homeActions';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const dispatch = useDispatch();
    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarModalAction(nuevo_estado));
    const abrir_registrarse_callAction = nuevo_estado => dispatch(abrirRegistrarseAction(nuevo_estado));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.home.abrir_modal);
    let abrir_registrate_state_store = useSelector(state => state.home.abrir_registrarse);

    /***********METODO QUE CIERRA MODAL Y ABRE REGISTRATE: modifico el state *************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            abrir_registrate_state_store = false;
            abrir_registrarse_callAction(abrir_registrate_state_store)
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    /***********METODO QUE ABRE INICIAR SESION Y CIERRA REGISTRATE: modifico el state *************/
    const handleClickToLogin = e => {
        e.preventDefault();
        // cerrar registrate
        abrir_registrarse_callAction(false);
    }

    return (

        <div className="login">

            <div className="login_container" >

                {/***********************
             ******* REGISTRARSE*****
            *************************/}


                <div className="form-container sign-in-container">
                    <ClearIcon
                        className="volver"
                        onClick={cerrar_modal}
                    />
                    <form>

                        <h1>Crear Cuenta</h1>

                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        </div>

                        <span>o usa tu email para la registracion</span>

                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />

                        <button>Registrate</button>

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
                                onClick={handleClickToLogin}
                            >Iniciar Sesión</button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Register
