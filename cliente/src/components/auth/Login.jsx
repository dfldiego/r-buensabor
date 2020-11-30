import React, { useState } from 'react';
import './Login.css';
import { Link, /* useHistory */ } from 'react-router-dom';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarModalAction,
    abrirRegistrarseAction,
    loginAction,
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
    const loginAction_callAction = (msj, datos) => dispatch(loginAction(msj, datos));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.home.abrir_modal);
    let usuarios_state_store = useSelector(state => state.admin.usuarios);
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

        // validaciones
        if (email.trim() === '' || password.trim() === '') {
            loginAction_callAction('Todos los campos son obligatorios', null);
            return;
        }

        await usuarios_state_store.forEach(usuario => {
            if (usuario.email === email && usuario.password === password) {
                console.log("entra");
                //enviar al action los datos ingresados
                loginAction_callAction('', login);
                // redireaccionar a componente catalogo
                /* history.push('/catalogo'); */
                return;
            } else {
                loginAction_callAction('No hay un usuario con ese email y contraseña', null);
            }
        });

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
                            <Link to={'#'} className="social"><i className="fab fa-google-plus-g"></i></Link>
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
                            <p>Ingresá tus detalles personales y unete a nosotros</p>
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

export default Login
