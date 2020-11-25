import {
    ENTRAR_CRUD_USUARIOS,
    ABRIR_AGREGAR_USUARIOS,
    CERRAR_AGREGAR_USUARIOS,
    AGREGAR_USUARIO,
    AGREGAR_USUARIO_EXITO,
    AGREGAR_USUARIO_ERROR,
    COMENZAR_DESCARGA_USUARIOS,
    DESCARGA_USUARIOS_EXITO,
    DESCARGA_USUARIOS_ERROR,
} from '../types';
import clienteAxios from '../config/axios';

/**********************  para obtener los usuarios de la BBDD ********************************/
export function obtenerUsuariosAction() {
    return async (dispatch) => {
        dispatch(descargarUsuarios());

        try {
            const respuesta = await clienteAxios.get('/api/users');
            console.log(respuesta);
            dispatch(descargarUsuariosExito(respuesta.data.users));
        } catch (error) {
            console.log(error);
            dispatch(descargarUsuariosError('Error al descargar los usuarios'));
        }

    }
}
const descargarUsuariosError = mensaje => ({
    type: DESCARGA_USUARIOS_ERROR,
    payload: mensaje,
});

const descargarUsuariosExito = respuesta => ({
    type: DESCARGA_USUARIOS_EXITO,
    payload: respuesta,
});

const descargarUsuarios = () => ({
    type: COMENZAR_DESCARGA_USUARIOS,
    payload: true
});

/**********************  para crear un nuevo usuario ********************************/
export function crearNuevoUsuarioAction(datosNuevoUsuario) {
    return async (dispatch) => {
        dispatch(agregarUsuario());

        const { name, email, password, telephoneNumber, role } = datosNuevoUsuario;

        // validar campos vacios
        if (name === '' || email === '' || password === '' || role === '') {
            console.log(datosNuevoUsuario);
            dispatch(agregarUsuarioError('Todos los campos son obligatorios'));
            return;
        }
        if (telephoneNumber <= 0) {
            dispatch(agregarUsuarioError('Nro de Teléfono no válido'));
            return;
        }
        // hacemos consulta a la BBDD
        try {
            // insertar en la API
            await clienteAxios.post('/api/users', datosNuevoUsuario)
            // si todo sale bien
            dispatch(agregarUsuarioExito(datosNuevoUsuario));
        } catch (error) {
            console.log(error);
            // si hay un error
            dispatch(agregarUsuarioError('Hubo un error, por favor comuniquese con el administrador'));
        }
    }
}

const agregarUsuario = () => ({
    type: AGREGAR_USUARIO,
    payload: true
})

// si el producto se guarda en la BBDD
const agregarUsuarioExito = datosNuevoUsuario => ({
    type: AGREGAR_USUARIO_EXITO,
    payload: datosNuevoUsuario
});

// si hubo un error
const agregarUsuarioError = (msj) => ({
    type: AGREGAR_USUARIO_ERROR,
    payload: msj
})


/********************** abrir modal agregar usuarios ********************************/
export function abrirCerrarAgregarUsuarioAction(estadoAgregarUsuario) {
    return (dispatch) => {
        if (estadoAgregarUsuario) {
            dispatch(abrirAgregarUsuario(estadoAgregarUsuario));
        } else {
            dispatch(cerrarAgregarUsuario(estadoAgregarUsuario));
        }
    }
}

const abrirAgregarUsuario = estadoAgregarUsuario => ({
    type: ABRIR_AGREGAR_USUARIOS,
    payload: estadoAgregarUsuario
})

const cerrarAgregarUsuario = estadoAgregarUsuario => ({
    type: CERRAR_AGREGAR_USUARIOS,
    payload: estadoAgregarUsuario
})

// aqui es donde vamos a abrir usuario
export function usuarioAction(estadoNuevo) {
    return (dispatch) => {
        dispatch(modificarEstadoUsuario(estadoNuevo))
    }
}

const modificarEstadoUsuario = estadoNuevo => ({
    type: ENTRAR_CRUD_USUARIOS,
    payload: estadoNuevo
})