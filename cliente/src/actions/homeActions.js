import {
    ABRIR_MODAL,
    CERRAR_MODAL,
    ABRIR_REGISTRARSE,
    CERRAR_REGISTRARSE,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    ESTA_LOGUEADO,
    NO_ESTA_LOGUEADO,
    CERRAR_SESION,
    ROL_USUARIO,
    ABRIR_PERFIL,
    CERRAR_PERFIL,
    ACTUALIZADO_PERFIL,
    ACTUALIZADO_PERFIL_ERROR,
} from '../types';
import clienteAxios from '../config/axios';

/************ ABRIR/CERRAR PERFIL ***************/
export function perfilAction(estadoPerfil) {
    return (dispatch) => {
        if (estadoPerfil) {
            dispatch(abrirModalPerfil(estadoPerfil))
        } else {
            dispatch(cerrarModalPerfil(estadoPerfil))
        }
    }
}

const abrirModalPerfil = estadoPerfil => ({
    type: ABRIR_PERFIL,
    payload: estadoPerfil
})

const cerrarModalPerfil = estadoPerfil => ({
    type: CERRAR_PERFIL,
    payload: estadoPerfil
})

/************ LOGIN - GOOGLE ***************/
export function loginGoogleAction(datos) {
    return async (dispatch) => {

        try {
            // buscar usuarios en la BD
            await clienteAxios.post('/login-google', datos)
                .then(response => {
                    console.log("entra a then");
                    console.log(response);
                    // obtenemos datos del response
                    const { token, user } = response.data;
                    console.log(token);
                    // guardamos token en el localStorage
                    localStorage.setItem('token', token);
                    dispatch(guardarTokenGoogle(token));
                    dispatch(guardarRol(user.role));
                })

            // SI TODO SALE BIEN
            dispatch(loginGoogleUsuario(true));



        } catch (error) {
            console.log(error.response.data.msg);
            console.log(error.response.data.err.errors.email.message);
            // si hay un error
            dispatch(loginGoogleUsuarioError(String(error.response.data.msg)));
        }
    }
}

const guardarRol = role => ({
    type: ROL_USUARIO,
    payload: role
})

const guardarTokenGoogle = token => ({
    type: ESTA_LOGUEADO,
    payload: token
})

const loginGoogleUsuario = estado => ({
    type: LOGIN_EXITOSO,
    payload: estado
})

const loginGoogleUsuarioError = msj => ({
    type: LOGIN_ERROR,
    payload: msj
})

/************ CERRAR SESION  ***************/
export function cerrarSesionAction() {
    return (dispatch) => {
        localStorage.clear();
        dispatch(cerrar_sesion());
    }
}

const cerrar_sesion = () => ({
    type: CERRAR_SESION,
    payload: null,
})

/*************VERIFICA SI ESTA LOGUEADO OBTENIENDO TOKEN DEL LOCALSTORAGE ***/
export function estaLogueadoAction() {
    return (dispatch) => {
        var token = localStorage.getItem('token');
        if (token === null) {
            dispatch(noestalogueado(null))
        } else {
            dispatch(estaloguado(token));
        }
    }
}

const estaloguado = token => ({
    type: ESTA_LOGUEADO,
    payload: token
})

const noestalogueado = estado => ({
    type: NO_ESTA_LOGUEADO,
    payload: estado
})

//aca es donde vamos a loguear un usuario
export function loginAction(datos) {
    return async (dispatch) => {

        const { email, password } = datos;

        // validaciones
        if (email.trim() === '' || password.trim() === '') {
            dispatch(loginUsuarioError('Todos los campos son obligatorios'));
            return;
        }

        try {
            // buscar usuarios en la BD
            await clienteAxios.post('/login', datos)
                .then(response => {
                    // obtenemos datos del response
                    const { token, user } = response.data;
                    // guardamos token en el localStorage
                    localStorage.setItem('token', token);
                    dispatch(guardarToken(token));
                    dispatch(guardarRolusuario(user.role));
                })

            // SI TODO SALE BIEN
            dispatch(loginUsuario(datos));

        } catch (error) {
            console.log(error.response.data.err.msg);
            // si hay un error
            dispatch(loginUsuarioError(String(error.response.data.err.msg)));
        }
    }
}

const guardarRolusuario = role => ({
    type: ROL_USUARIO,
    payload: role
})

const guardarToken = token => ({
    type: ESTA_LOGUEADO,
    payload: token
})

const loginUsuario = datos => ({
    type: LOGIN_EXITOSO,
    payload: datos
})

const loginUsuarioError = msj => ({
    type: LOGIN_ERROR,
    payload: msj
})

//aca es donde vamos a registrar un usuario
export function registrarAction(datos) {
    return async (dispatch) => {

        const { email, password } = datos;

        // validar formulario
        if (email.trim() === '' || password.trim() === '') {
            dispatch(registrarUsuarioError('Todos los campos son obligatorios'));
            return;
        }
        if (password.length < 6) {
            dispatch(registrarUsuarioError('El password debe ser de al menos 6 caracteres'));
            return;
        }

        try {
            // insertarlo en la BD
            await clienteAxios.post('/api/register', datos)
            // si todo sale bien
            dispatch(registrarUsuario(datos));
        } catch (error) {
            console.log(error.response.data.msg);
            // si hay un error
            dispatch(registrarUsuarioError(String(error.response.data.msg)));
        }
    }
}

const registrarUsuario = datos => ({
    type: REGISTRO_EXITOSO,
    payload: datos,
})

const registrarUsuarioError = msj => ({
    type: REGISTRO_ERROR,
    payload: msj
})


// aca es donde vamos a abrir el modal  
export function abrirCerrarModalAction(estado_modal) {
    return (dispatch) => {
        if (estado_modal) {
            dispatch(abrirModal(estado_modal));
        } else {
            dispatch(cerrarModal(estado_modal));
        }
    }
}

const abrirModal = estado_modal => ({
    type: ABRIR_MODAL,
    payload: estado_modal
})

const cerrarModal = estado_modal => ({
    type: CERRAR_MODAL,
    payload: estado_modal
})

/********* ABRIR/CERRAR REGISTRARSE ********/
export function abrirRegistrarseAction(estado_registrate) {
    return (dispatch) => {
        if (estado_registrate) {
            dispatch(abrirRegistrarse(estado_registrate));
        } else {
            dispatch(cerrarRegistrarse(estado_registrate));
        }
    }
}

const abrirRegistrarse = estado_registrate => ({
    type: ABRIR_REGISTRARSE,
    payload: estado_registrate
})

const cerrarRegistrarse = estado_registrate => ({
    type: CERRAR_REGISTRARSE,
    payload: estado_registrate
})