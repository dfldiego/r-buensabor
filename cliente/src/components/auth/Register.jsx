import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarModalAction,
    abrirRegistrarseAction,
    registrarAction,
} from '../../actions/homeActions';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {

    const [registro, setRegistro] = useState({
        email: "",
        password: "",
    })

    //extraer los valores del state para limpiar el state
    const { email, password } = registro;


    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const dispatch = useDispatch();
    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarModalAction(nuevo_estado));
    const abrir_registrarse_callAction = nuevo_estado => dispatch(abrirRegistrarseAction(nuevo_estado));
    const registrarAction_callAction = datos => dispatch(registrarAction(datos));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.home.abrir_modal);
    let abrir_registrate_state_store = useSelector(state => state.home.abrir_registrarse);
    let alerta_state_store = useSelector(state => state.home.alerta);
    let mensaje_state_store = useSelector(state => state.home.mensaje);

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

    /** METODO PARA CAPTURAR LO QUE EL USUARIO ESCRIBE **/
    const actualizarState = e => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value
        })
    }

    /** METODO SUBMIT**/
    const submitRegistro = async (e) => {
        e.preventDefault();

        //enviar al action los datos ingresados
        registrarAction_callAction(registro);
        setRegistro({
            email: "",
            password: ""
        });
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
                    <form
                        onSubmit={submitRegistro}
                    >
                        <h1>Crear Cuenta</h1>
                        <div className="social-container">
                            <Link to={'#'} className="social"><i className="fab fa-google-plus-g"></i></Link>
                        </div>
                        <span>o usa tu email para la registracion</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={actualizarState}
                            value={email}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={actualizarState}
                            value={password}
                        />
                        <button
                            type="submit"
                        >Registrate</button>
                        {alerta_state_store ? <p className="alerta-error">{mensaje_state_store}</p> : null}
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
