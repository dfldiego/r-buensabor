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
    OBTENER_USUARIO_ELIMINAR,
    USUARIO_ELIMINADO_EXITO,
    USUARIO_ELIMINADO_ERROR,
    OBTENER_USUARIO_EDITAR,
    USUARIO_EDITADO_EXITO,
    USUARIO_EDITADO_ERROR,
    ENTRAR_CRUD_MENU,
    ENTRAR_CRUD_CATEGORIA,
    ENTRAR_CRUD_INSUMOS,
    ABRIR_AGREGAR_CATEGORIA,
    CERRAR_AGREGAR_CATEGORIA,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// abrir modal agregar categoria
export function abrirCerrarAgregarCategoriaAction(estadoAgregarCategoria) {
    return (dispatch) => {
        if (estadoAgregarCategoria) {
            dispatch(abrirAgregarCategoria(estadoAgregarCategoria));
        } else {
            dispatch(cerrarAgregarCategoria(estadoAgregarCategoria));
        }
    }
}

const abrirAgregarCategoria = estadoAgregarCategoria => ({
    type: ABRIR_AGREGAR_CATEGORIA,
    payload: estadoAgregarCategoria
})

const cerrarAgregarCategoria = estadoAgregarCategoria => ({
    type: CERRAR_AGREGAR_CATEGORIA,
    payload: estadoAgregarCategoria
})

/********************** Entrar a CRUD MENU ***********************/
export function pantallaInsumosAction(estadoInsumos) {
    return (dispatch) => {
        dispatch(pantallaInsumos(estadoInsumos))
    }
}

const pantallaInsumos = estado => ({
    type: ENTRAR_CRUD_INSUMOS,
    payload: estado
})

/********************** Entrar a CRUD CATEGORIA ***********************/
export function pantallaCategoriaAction(estadoCategoria) {
    return (dispatch) => {
        dispatch(pantallaCategoria(estadoCategoria))
    }
}

const pantallaCategoria = estado => ({
    type: ENTRAR_CRUD_CATEGORIA,
    payload: estado
})

/********************** Entrar a CRUD MENU ***********************/
export function pantallaMenuAction(estadoMenu) {
    return (dispatch) => {
        dispatch(pantallaMenu(estadoMenu))
    }
}

const pantallaMenu = estado => ({
    type: ENTRAR_CRUD_MENU,
    payload: estado
})


/**********************  para editar un usuario de la BBDD ********************************/
export function obtenerUsuarioAction(datos_usuario) {
    return async (dispatch) => {
        dispatch(editarUsuario(datos_usuario))
    }
}

export function editarUsuarioAction(datos_usuario) {
    return async (dispatch) => {
        const { name, email, telephoneNumber, role } = datos_usuario;
        // validar campos vacios
        if (name === '' || email === '' || role === '') {
            dispatch(agregarUsuarioError('Todos los campos son obligatorios'));
            return;
        }
        if (telephoneNumber <= 0) {
            dispatch(agregarUsuarioError('Nro de Teléfono no válido'));
            return;
        }

        try {
            await clienteAxios.put(`/api/users/${datos_usuario._id}`, datos_usuario);
            dispatch(editarUsuarioExito(datos_usuario));
        } catch (error) {
            console.log(error);
            dispatch(editarUsuarioError('Error al editar el usuario'));
        }
    }
}

const editarUsuario = usuario => ({
    type: OBTENER_USUARIO_EDITAR,
    payload: usuario
})

const editarUsuarioExito = usuario => ({
    type: USUARIO_EDITADO_EXITO,
    payload: usuario
})

const editarUsuarioError = msj => ({
    type: USUARIO_EDITADO_ERROR,
    payload: msj
})


/**********************  para eliminar un usuario de la BBDD ********************************/
export function eliminarUsuarioAction(datos_usuario) {
    return async (dispatch) => {
        datos_usuario.status = false;
        dispatch(obtenerUsuarioEliminar(datos_usuario._id));

        try {
            await clienteAxios.put(`/api/users/${datos_usuario._id}`, datos_usuario);
            dispatch(usuarioEliminadoExito(datos_usuario));
            // si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El usuario se eliminó correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(usuarioEliminadoError('Error al eliminar el usuario'));
        }
    }
}

const usuarioEliminadoError = msj => ({
    type: USUARIO_ELIMINADO_ERROR,
    payload: msj
})

const usuarioEliminadoExito = datos_usuario => ({
    type: USUARIO_ELIMINADO_EXITO,
    payload: datos_usuario
})

const obtenerUsuarioEliminar = idUsuario => ({
    type: OBTENER_USUARIO_ELIMINAR,
    payload: idUsuario
})

/**********************  para obtener los usuarios de la BBDD ********************************/
export function obtenerUsuariosAction(indexPrimerUsuario) {
    return async (dispatch) => {
        dispatch(descargarUsuarios());

        try {
            const token = localStorage.getItem('token');
            const header = {
                headers: {
                    'Authorization': `${token}`
                }
            }
            console.log(indexPrimerUsuario);
            const respuesta = await clienteAxios.get(`/api/users?from=${indexPrimerUsuario}&limit=5`, header);
            console.log(respuesta.data);
            dispatch(descargarUsuariosExito(respuesta.data));
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

        // ACA SALTA UN ERROR CUANDO EL EMAIL YA EXISTE EN BBDD
        // APRENDER A PASAR LOS ERRORES DE LA BBDD A LA VISTA

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