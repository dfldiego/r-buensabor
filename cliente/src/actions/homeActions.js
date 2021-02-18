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
    ABRIR_CARRITO,
    CERRAR_CARRITO,
    AGREGAR_CARRITO,
    AGREGAR_CARRITO_EXITO,
    OBTENER_PRODUCTO_CARRITO_ELIMINAR,
    PRODUCTO_CARRITO_ELIMINADO_EXITO,
    ELIMINAR_PRODUCTO_CARRITO_ERROR,
    OBTENER_PRODUCTO_CARRITO,
    AGREGAR_ORDEN,
    AGREGAR_ORDEN_EXITO,
    AGREGAR_ORDEN_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import { validateTimeTokens } from '../helpers/validateTime_token';
import { desencriptarToken } from '../helpers/desencriptar_token';
import { authorizationHeader } from '../helpers/authorization_header';

/**********************  para crear una nueva orden ********************************/
export function crearNuevaOrdenAction(datosOrden, datosFactura) {
    return async (dispatch) => {
        dispatch(agregarOrden());
        console.log(datosOrden);

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            await clienteAxios.post('/api/order', datosOrden, header)
                .then(response => {
                    dispatch(agregarOrdenExito(response.data.order));
                    localStorage.setItem("carrito", "[]");

                    datosFactura.order = response.data.order._id;
                    clienteAxios.post('/api/bill', datosFactura, header)
                })
        } catch (err) {
            console.log(err.response.data);
            dispatch(agregarOrdenError(err.response.data.err.msg));
        }
    }
}

const agregarOrden = () => ({
    type: AGREGAR_ORDEN,
    payload: true
})

// si el producto se guarda en la BBDD
const agregarOrdenExito = datosOrden => ({
    type: AGREGAR_ORDEN_EXITO,
    payload: datosOrden
});

// si hubo un error
const agregarOrdenError = error => ({
    type: AGREGAR_ORDEN_ERROR,
    payload: error
})

/**********************  para obtener los producto del carrito ********************************/
export function obtenerProductoCarritoAction() {
    return async (dispatch) => {

        if (localStorage.getItem('carrito')) {
            var carrito = JSON.parse(localStorage.getItem('carrito'));
            dispatch(obtenerProductoCarrito(carrito));
        } else {
            return;
        }
    }
}

const obtenerProductoCarrito = productoCarrito => ({
    type: OBTENER_PRODUCTO_CARRITO,
    payload: productoCarrito
})

/**********************  para eliminar los producto del carrito ********************************/
export function eliminarProductoCarritoAction(productoCarrito) {
    return async (dispatch) => {
        console.log(productoCarrito);
        dispatch(obtenerProductoCarritoEliminar(productoCarrito.uuid));
        if (localStorage.getItem('carrito')) {
            var carrito = JSON.parse(localStorage.getItem('carrito'));
            console.log(carrito);
            // busco el producto donde coincidan el uuid
            // obtengo el indice donde coinciden los uuid
            const nuevoCarrito = carrito.filter(producto => producto.uuid !== productoCarrito.uuid);
            console.log(nuevoCarrito);
            // vuelvo a setear un nuevo carrito.
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito))
            //envio el producto a eliminar al reducer.
            dispatch(ProductoCarritoEliminadoExito(nuevoCarrito))

        } else {
            dispatch(ProductoCarritoEliminadoError('Error al eliminar el producto del carrito'));
        }
    }
}

const obtenerProductoCarritoEliminar = idInsumo => ({
    type: OBTENER_PRODUCTO_CARRITO_ELIMINAR,
    payload: idInsumo
})

const ProductoCarritoEliminadoExito = datos_insumos => ({
    type: PRODUCTO_CARRITO_ELIMINADO_EXITO,
    payload: datos_insumos
})

const ProductoCarritoEliminadoError = msj => ({
    type: ELIMINAR_PRODUCTO_CARRITO_ERROR,
    payload: msj
})

// aca agregamos un menu al carrito
export function agregarMenuACarritoAction(menu) {
    return (dispatch) => {
        dispatch(agregarMenuACarrito());

        let carritoLocal = JSON.parse(localStorage.getItem("carrito"));

        if (carritoLocal) {
            carritoLocal = [...carritoLocal, menu];
            localStorage.setItem("carrito", JSON.stringify(carritoLocal));
            dispatch(agregarMenuACarritoExito(menu));
        }
    }
}

const agregarMenuACarrito = () => ({
    type: AGREGAR_CARRITO,
    payload: true
})

const agregarMenuACarritoExito = menu => ({
    type: AGREGAR_CARRITO_EXITO,
    payload: menu
})

// aca es donde indicamos que debe abrir/cerrar modal de carrito
export function abrirModalCarritoAction(estadoCarrito) {
    return (dispatch) => {
        if (estadoCarrito) {
            dispatch(abrirModalCarrito(estadoCarrito));
        } else {
            dispatch(cerrarModalCarrito(estadoCarrito));
        }
    }
}

const abrirModalCarrito = estadoCarrito => ({
    type: ABRIR_CARRITO,
    payload: estadoCarrito
})

const cerrarModalCarrito = estadoCarrito => ({
    type: CERRAR_CARRITO,
    payload: estadoCarrito
})

/************ ACTUALIZAR PERFIL DE USUARIO  ********/
export function actualizarPerfilAction(perfil, imageFile) {
    return async (dispatch) => {
        try {
            console.log(perfil);
            console.log(imageFile);
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            const responseToken = await desencriptarToken(token);
            console.log(responseToken);
            if (imageFile !== null) {
                const formData = new FormData();
                formData.append('file', imageFile.img);

                await clienteAxios.put(`/api/upload/users/${responseToken.user._id}`, formData, header)
                    .then(response => {
                        console.log(response);
                        clienteAxios.put(`/api/users/${response.data.result._id}`, perfil, header)
                        dispatch(actualizarPerfilExito(true));
                    })
            } else {
                await clienteAxios.put(`/api/users/${responseToken.user._id}`, perfil, header)
                dispatch(actualizarPerfilExito(true));
            }
        } catch (err) {
            console.log(err);
            dispatch(actualizarPerfilError("Error al actualizar Perfil"));
        }
    }
}

const actualizarPerfilExito = respuesta => ({
    type: ACTUALIZADO_PERFIL,
    payload: respuesta
})

const actualizarPerfilError = msg => ({
    type: ACTUALIZADO_PERFIL_ERROR,
    payload: msg
})

/************ ABRIR/CERRAR PERFIL ***************/
export function perfilAction(estadoPerfil) {
    return async (dispatch) => {
        if (estadoPerfil) {
            // hacemos consulta a la BBDD pidiendo perfil
            try {
                //obtenemos el id del perfil desde el token
                const token = localStorage.getItem('token');
                var usuarioBase64 = token.split('.')[1];
                usuarioBase64 = usuarioBase64.replace('-', '+').replace('_', '/');
                var response = await JSON.parse(window.atob(usuarioBase64));
                console.log(response);
                //obtenemos los datos del id desde la DB - getOne User
                //añadimos header para obtener autorizacion
                const header = authorizationHeader(token);
                const respuesta = await clienteAxios.get(`/api/users/${response.user._id}`, header);
                console.log(respuesta);
                // enviamos la respuesta del getOne al reducer.
                dispatch(abrirModalPerfil(respuesta.data.user));

            } catch (error) {
                console.log(error);
            }
        } else {
            dispatch(cerrarModalPerfil(estadoPerfil));
        }
    }
}

const abrirModalPerfil = userPerfil => ({
    type: ABRIR_PERFIL,
    payload: userPerfil
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
                    // obtenemos datos del response
                    const { token, user } = response.data;

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

            desencriptarToken(token)
                .then(async responseToken => {
                    const estaExpirado = await validateTimeTokens(responseToken);
                    if (estaExpirado) {
                        localStorage.clear();
                        dispatch(cerrar_sesion());
                    }
                })
            // si no hay carrito en localstorage
            if (!localStorage.getItem('carrito')) {
                localStorage.setItem('carrito', '[]');
            } else {
                dispatch(obtenerProductoCarrito(JSON.parse(localStorage.getItem('carrito'))));
            }
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
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(guardarToken(token));
                    dispatch(guardarRolusuario(user.role));
                })

            // SI TODO SALE BIEN
            dispatch(loginUsuario(datos));

            // si no hay carrito en localstorage
            if (!localStorage.getItem('carrito')) {
                localStorage.setItem('carrito', '[]');
            }/*  else {
                dispatch(obtenerProductoCarrito(localStorage.getItem('carrito')));
            } */

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