import React, { useState } from 'react';
import './Login.css';
import { Link, /* useHistory */ } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarModalAction,
    abrirRegistrarseAction,
    loginAction,
    loginGoogleAction,
    obtenerProductoCarritoAction,
} from '../../actions/homeActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

    // redireccionar a la pagina principal una vez que editamos el producto
    /* const history = useHistory(); */

    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    //extraer los valores del state para limpiar el state
    const { email, password } = login;

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const dispatch = useDispatch();
    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarModalAction(nuevo_estado));
    const abrir_registrarse_callAction = nuevo_estado => dispatch(abrirRegistrarseAction(nuevo_estado));
    const loginAction_callAction = datos => dispatch(loginAction(datos));
    const loginGoogle_callAction = datos => dispatch(loginGoogleAction(datos));
    const obtenerProductoCarrito = () => dispatch(obtenerProductoCarritoAction());

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.home.abrir_modal);
    let alerta_state_store = useSelector(state => state.home.alerta);
    let mensaje_state_store = useSelector(state => state.home.mensaje);

    /***********METODO QUE CIERRA MODAL: modifico el state *************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    /************METODO QUE ABRE PANTALLA DE REGISTRACION ****************/
    const handleClickToRegister = e => {
        e.preventDefault();

        // pasar a true el state de registrateClickeado.
        abrir_registrarse_callAction(true);
    }

    /** METODO PARA CAPTURAR LO QUE EL USUARIO ESCRIBE **/
    const actualizarState = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    /** METODO SUBMIT**/
    const submitLogin = async (e) => {
        e.preventDefault();
        loginAction_callAction(login);
        obtenerProductoCarrito();
    }

    /**LOGIN CON GOOGLE **/
    const responseGoogle = (response) => {
        loginGoogle_callAction(response);
    }

    return (

        <div className="login">
            <div className="login_container" >

                {/***********************
             ******* INICIAR SESION*****
            *************************/}

                <div className="form-container sign-in-container">
                    <ClearIcon
                        className="volver"
                        onClick={cerrar_modal}
                    />
                    <form onSubmit={submitLogin}>
                        <h1>Inicia Sesión</h1>
                        <div className="social-container">
                            <GoogleLogin
                                clientId="751594683411-f3rg3qjfkba8uissihrmfvv0m62pn7bg.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <span>o usa tu cuenta</span>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={actualizarState}
                            value={email}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            onChange={actualizarState}
                            value={password}
                        />

                        <button type="submit">Iniciar Sesión</button>
                        {alerta_state_store ? <p className="alerta-error">{mensaje_state_store}</p> : null}
                    </form>

                </div>

                {/** OVERLAY **/}
                <div className="overlay-container">
                    <div className="overlay">
                        {/** RIGHT OVERLAY PANEL **/}
                        <div className="overlay-panel overlay-right">
                            <h1>¡Hola Amigo!</h1>
                            <button
                                className="ghost"
                                onClick={handleClickToRegister}
                            >Registrate</button>
                            <Link to={'#'} className="olvidepass">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;