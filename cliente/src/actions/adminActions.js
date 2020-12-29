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
    AGREGAR_CATEGORIA,
    AGREGAR_CATEGORIA_EXITO,
    AGREGAR_CATEGORIA_ERROR,
    COMENZAR_DESCARGA_CATEGORIA,
    DESCARGA_CATEGORIA_EXITO,
    DESCARGA_CATEGORIA_ERROR,
    OBTENER_CATEGORIA_ELIMINAR,
    CATEGORIA_ELIMINADO_EXITO,
    CATEGORIA_ELIMINADO_ERROR,
    OBTENER_CATEGORIA_EDITAR,
    CATEGORIA_EDITADO_EXITO,
    CATEGORIA_EDITADO_ERROR,
    ABRIR_AGREGAR_MENU,
    CERRAR_AGREGAR_MENU,
    AGREGAR_MENU,
    AGREGAR_MENU_EXITO,
    AGREGAR_MENU_ERROR,
    AGREGAR_MENU_ERRORES,
    COMENZAR_DESCARGA_MENU,
    DESCARGA_MENU_EXITO,
    DESCARGA_MENU_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
import { authorizationHeader } from '../helpers/authorization_header';

/**********************  para obtener los menus de la BBDD ********************************/
export function obtenerMenuAction() {
    return async (dispatch) => {
        dispatch(descargarMenus());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get('/api/menu', header)
                .then(response => {
                    // obtenemos datos del response
                    const { menus } = response.data;
                    // si todo sale bien
                    dispatch(descargarMenusExito(menus));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarMenusError('Error al descargar los menus'));
        }
    }
}

const descargarMenus = () => ({
    type: COMENZAR_DESCARGA_MENU,
    payload: true
});

const descargarMenusExito = respuesta => ({
    type: DESCARGA_MENU_EXITO,
    payload: respuesta,
});

const descargarMenusError = errores => ({
    type: DESCARGA_MENU_ERROR,
    payload: errores,
});

/**********************  para crear una nuevo menu ********************************/
export function crearNuevoMenuAction(datosNuevoMenu) {
    return async (dispatch) => {
        dispatch(agregarMenu());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.post('/api/menu', datosNuevoMenu, header)
                .then(response => {
                    console.log(response.data);
                    // obtenemos datos del response
                    const { menu } = response.data;
                    // si todo sale bien
                    dispatch(agregarMenuExito(menu));
                })
        } catch (err) {
            console.log(err.response.data.msg);
            if (err.response.data.msg !== undefined) {
                dispatch(agregarMenuError(err.response.data.msg));
            } else {
                if (err.response.data.err.errors) {
                    dispatch(agregarMenuErrores(err.response.data.err.errors));
                }
            }
        }
    }
}

const agregarMenu = () => ({
    type: AGREGAR_MENU,
    payload: true
})

// si el producto se guarda en la BBDD
const agregarMenuExito = datosNuevoMenu => ({
    type: AGREGAR_MENU_EXITO,
    payload: datosNuevoMenu
});

// si hubo un error
const agregarMenuErrores = errores => ({
    type: AGREGAR_MENU_ERRORES,
    payload: errores
})

const agregarMenuError = msj => ({
    type: AGREGAR_MENU_ERROR,
    payload: msj,
});

/**********************  para abrir modal agregar Menu ********************************/
export function abrirCerrarAgregarMenuAction(estadoAgregarMenu) {
    return (dispatch) => {
        if (estadoAgregarMenu) {
            dispatch(abrirAgregarMenu(estadoAgregarMenu));
        } else {
            dispatch(cerrarAgregarMenu(estadoAgregarMenu));
        }
    }
}

const abrirAgregarMenu = estadoAgregarMenu => ({
    type: ABRIR_AGREGAR_MENU,
    payload: estadoAgregarMenu
})

const cerrarAgregarMenu = estadoAgregarMenu => ({
    type: CERRAR_AGREGAR_MENU,
    payload: estadoAgregarMenu
})

/**********************  para editar una categoria de la BBDD ********************************/
export function obtenerCategoriaAction(datos_categoria) {
    return async (dispatch) => {
        dispatch(editarCategoria(datos_categoria))
    }
}

export function editarCategoriaAction(datos_categoria) {
    return async (dispatch) => {
        const { name } = datos_categoria;
        // validar campos vacios
        if (name === '') {
            dispatch(agregarCategoriaError('Todos los campos son obligatorios'));
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.put(`/api/menu-categories/${datos_categoria._id}`, datos_categoria, header);
            dispatch(editarCategoriaExito(datos_categoria));
        } catch (error) {
            console.log(error);
            dispatch(editarCategoriaError('Error al editar la categoria'));
        }
    }
}

const editarCategoria = categoria => ({
    type: OBTENER_CATEGORIA_EDITAR,
    payload: categoria
})

const editarCategoriaExito = categoria => ({
    type: CATEGORIA_EDITADO_EXITO,
    payload: categoria
})

const editarCategoriaError = msj => ({
    type: CATEGORIA_EDITADO_ERROR,
    payload: msj
})

/**********************  para eliminar un categoria de la BBDD ********************************/
export function eliminarCategoriaAction(datos_categoria) {
    return async (dispatch) => {
        datos_categoria.status = false;
        dispatch(obtenerCategoriaEliminar(datos_categoria._id));

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.put(`/api/menu-categories/${datos_categoria._id}`, datos_categoria, header);
            dispatch(categoriaEliminadoExito(datos_categoria));
            // si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'La categoria se eliminó correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(categoriaEliminadoError('Error al eliminar la categoria'));
        }
    }
}

const categoriaEliminadoError = msj => ({
    type: CATEGORIA_ELIMINADO_ERROR,
    payload: msj
})

const categoriaEliminadoExito = datos_categoria => ({
    type: CATEGORIA_ELIMINADO_EXITO,
    payload: datos_categoria
})

const obtenerCategoriaEliminar = idcategoria => ({
    type: OBTENER_CATEGORIA_ELIMINAR,
    payload: idcategoria
})

/**********************  para obtener los categorias de la BBDD ********************************/
export function obtenerCategoriasAction() {
    return async (dispatch) => {
        dispatch(descargarCategorias());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            const respuesta = await clienteAxios.get('/api/menu-categories', header);
            dispatch(descargarCategoriasExito(respuesta.data.categories));
        } catch (error) {
            console.log(error);
            dispatch(descargarCategoriasError('Error al descargar los categoria'));
        }

    }
}
const descargarCategoriasError = mensaje => ({
    type: DESCARGA_CATEGORIA_ERROR,
    payload: mensaje,
});

const descargarCategoriasExito = respuesta => ({
    type: DESCARGA_CATEGORIA_EXITO,
    payload: respuesta,
});

const descargarCategorias = () => ({
    type: COMENZAR_DESCARGA_CATEGORIA,
    payload: true
});

/**********************  para crear una nueva categoria ********************************/
export function crearNuevaCategoriaAction(datosNuevaCategoria) {
    return async (dispatch) => {
        dispatch(agregarCategoria());
        // validaciones
        if (datosNuevaCategoria.name.trim() === '') {
            dispatch(agregarCategoriaError('Todos los campos son obligatorios'));
            return;
        }
        // hacemos consulta a la BBDD
        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            // insertar en la API
            await clienteAxios.post('/api/menu-categories', datosNuevaCategoria, header)
                .then(response => {
                    // obtenemos datos del response
                    const { category } = response.data;
                    // si todo sale bien
                    dispatch(agregarCategoriaExito(category));
                })
        } catch (error) {
            console.log(error.response);
            // si hay un error
            dispatch(agregarCategoriaError("Error al enviar datos al BD"));
        }
    }
}

const agregarCategoria = () => ({
    type: AGREGAR_CATEGORIA,
    payload: true
})

// si el producto se guarda en la BBDD
const agregarCategoriaExito = category => ({
    type: AGREGAR_CATEGORIA_EXITO,
    payload: category
});

// si hubo un error
const agregarCategoriaError = estado => ({
    type: AGREGAR_CATEGORIA_ERROR,
    payload: estado
})

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
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.put(`/api/users/${datos_usuario._id}`, datos_usuario, header);
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
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.put(`/api/users/${datos_usuario._id}`, datos_usuario, header);
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
            const respuesta = await clienteAxios.get(`/api/users?from=${indexPrimerUsuario}&limit=5`, header);
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
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            // insertar en la API
            await clienteAxios.post('/api/users', datosNuevoUsuario, header)
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