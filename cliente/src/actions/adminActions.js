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
    AGREGAR_CATEGORIA_ERRORES,
    COMENZAR_DESCARGA_CATEGORIA,
    DESCARGA_CATEGORIA_EXITO,
    DESCARGA_CATEGORIA_ERROR,
    OBTENER_CATEGORIA_ELIMINAR,
    CATEGORIA_ELIMINADO_EXITO,
    CATEGORIA_ELIMINADO_ERROR,
    OBTENER_CATEGORIA_EDITAR,
    CATEGORIA_EDITADO_EXITO,
    CATEGORIA_EDITADO_ERROR,
    CATEGORIA_EDITADO_ERRORES,
    ABRIR_AGREGAR_MENU,
    CERRAR_AGREGAR_MENU,
    AGREGAR_MENU,
    AGREGAR_MENU_EXITO,
    AGREGAR_MENU_ERROR,
    AGREGAR_MENU_ERRORES,
    COMENZAR_DESCARGA_MENU,
    DESCARGA_MENU_EXITO,
    DESCARGA_MENU_ERROR,
    OBTENER_MENU_ELIMINAR,
    MENU_ELIMINADO_EXITO,
    MENU_ELIMINADO_ERROR,
    OBTENER_MENU_EDITAR,
    MENU_EDITADO_EXITO,
    MENU_EDITADO_ERROR,
    MENU_EDITADO_ERRORES,
    ENTRAR_CRUD_CATEGORIA_INSUMOS,
    ABRIR_AGREGAR_CATEGORIA_INSUMO,
    CERRAR_AGREGAR_CATEGORIA_INSUMO,
    AGREGAR_CATEGORIA_INSUMO,
    AGREGAR_CATEGORIA_INSUMO_EXITO,
    AGREGAR_CATEGORIA_INSUMO_ERRORES,
    AGREGAR_CATEGORIA_INSUMO_ERROR,
    COMENZAR_DESCARGA_CATEGORIA_INSUMO,
    DESCARGA_CATEGORIA_INSUMO_EXITO,
    DESCARGA_CATEGORIA_INSUMO_ERROR,
    OBTENER_CATEGORIA_INSUMO_ELIMINAR,
    CATEGORIA_INSUMO_ELIMINADO_EXITO,
    CATEGORIA_INSUMO_ELIMINADO_ERROR,
    OBTENER_CATEGORIA_INSUMO_EDITAR,
    CATEGORIA_INSUMO_EDITADO_EXITO,
    CATEGORIA_INSUMO_EDITADO_ERROR,
    CATEGORIA_INSUMO_EDITADO_ERRORES,
    ABRIR_AGREGAR_INSUMO,
    CERRAR_AGREGAR_INSUMO,
    AGREGAR_INSUMO,
    AGREGAR_INSUMO_EXITO,
    AGREGAR_INSUMO_ERRORES,
    AGREGAR_INSUMO_ERROR,
    COMENZAR_DESCARGA_INSUMO,
    DESCARGA_INSUMO_EXITO,
    DESCARGA_INSUMO_ERROR,
    OBTENER_INSUMO_ELIMINAR,
    INSUMO_ELIMINADO_EXITO,
    INSUMO_ELIMINADO_ERROR,
    OBTENER_INSUMO_EDITAR,
    INSUMO_EDITADO_EXITO,
    INSUMO_EDITADO_ERROR,
    INSUMO_EDITADO_ERRORES,
    DESCARGA_LISTADO_CATEGORIA,
    DESCARGA_LISTADO_CATEGORIA_INSUMO,
    DESCARGA_LISTADO_MENUS,
    DESCARGA_LISTADO_INSUMOS,
    ENTRAR_CRUD_PEDIDOS,
    COMENZAR_DESCARGA_PEDIDOS,
    DESCARGA_PEDIDOS_EXITO,
    DESCARGA_PEDIDOS_ERROR,
    DESCARGA_USER_ID,
    DESCARGA_LISTADO_MENU_DETALLE,
    DESCARGA_MENU_DETALLE_ERROR,
    OBTENER_MENU_DETALLE_EDITAR,
    ABRIR_MODAL_DETALLE_PEDIDO,
    CERRAR_MODAL_DETALLE_PEDIDO,
    OBTENER_INSUMO_POR_ID,
    OBTENER_INSUMO_POR_ID_ERROR,
    OBTENER_MENU_POR_ID,
    OBTENER_MENU_POR_ID_ERROR,
    GUARDA_DETALLE_PEDIDO,
    ENTRAR_CRUD_CONFIGURACION,
    CONFIGURACION_EDITADO_EXITO,
    CONFIGURACION_EDITADO_ERROR,
    DESCARGA_LISTADO_CONFIGURACION,
    OBTENER_CONFIGURACION_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
import { authorizationHeader } from '../helpers/authorization_header';

/********************** Editar una cuenta de Configuracion ***********************/
export function editarConfiguracionAction(datosConfiguracion) {
    return async (dispatch) => {
        console.log(datosConfiguracion);
        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.put(`/api/config/${datosConfiguracion._id}`, datosConfiguracion, header)
                .then(response => {
                    dispatch(editarConfiguracionExito(response.data.config));
                })
        } catch (error) {
            console.log(error);
            dispatch(editarConfiguracionError('Error al editar la configuracion'));
        }
    }
}

const editarConfiguracionExito = config => ({
    type: CONFIGURACION_EDITADO_EXITO,
    payload: config
})

const editarConfiguracionError = msj => ({
    type: CONFIGURACION_EDITADO_ERROR,
    payload: msj
})

/**********************  para obtener la configuracion desde la BBDD ********************************/
export function obtenerConfiguracionAction() {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            await clienteAxios.get(`/api/config`, header)
                .then(response => {
                    dispatch(obtenerDatoConfiguracion(response.data.config));
                })

        } catch (err) {
            console.log(err);
            dispatch(descargarConfiguracionError("Error al obtener la configuracion"));
        }

    }
}

const obtenerDatoConfiguracion = config => ({
    type: DESCARGA_LISTADO_CONFIGURACION,
    payload: config
})

const descargarConfiguracionError = msj => ({
    type: OBTENER_CONFIGURACION_ERROR,
    payload: msj
})

/********************** Entrar a CRUD CONFIGURACION ***********************/
export function pantallaConfiguracionAction(estadoConfiguracion) {
    return (dispatch) => {
        dispatch(pantallaConfiguracion(estadoConfiguracion))
    }
}

const pantallaConfiguracion = estadoConfiguracion => ({
    type: ENTRAR_CRUD_CONFIGURACION,
    payload: estadoConfiguracion
})

export function guardarDetallePedidoAction(detalles) {
    return async (dispatch) => {
        dispatch(guardarDetallePedido(detalles));
    }
}

const guardarDetallePedido = idMenu => ({
    type: GUARDA_DETALLE_PEDIDO,
    payload: idMenu
})
/**********************  para obtener los menu del detalle pedido de la BBDD ********************************/
export function obtenerMenuPorIdAction(idMenu) {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/menu/${idMenu}`, header)
                .then(response => {
                    console.log(response.data);
                    dispatch(obtenerMenuPorIdExito(response.data.menu));
                })
        } catch (err) {
            console.log(err);
            dispatch(obtenerMenuPorIdError('Error al obtener insumo por id'));
        }
    }
}

const obtenerMenuPorIdExito = idMenu => ({
    type: OBTENER_MENU_POR_ID,
    payload: idMenu
})

const obtenerMenuPorIdError = msj => ({
    type: OBTENER_MENU_POR_ID_ERROR,
    payload: msj
})


/**********************  para obtener los producto del detalle pedido de la BBDD ********************************/
export function obtenerProductoPorIdAction(idInsumo) {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/product/${idInsumo}`, header)
                .then(response => {
                    console.log(response.data);
                    dispatch(obtenerInsumoPorIdExito(response.data.product));
                })
        } catch (err) {
            console.log(err);
            dispatch(obtenerInsumoPorIdError('Error al obtener insumo por id'));
        }
    }
}

const obtenerInsumoPorIdExito = datos_insumos => ({
    type: OBTENER_INSUMO_POR_ID,
    payload: datos_insumos
})

const obtenerInsumoPorIdError = msj => ({
    type: OBTENER_INSUMO_POR_ID_ERROR,
    payload: msj
})

/**********************  para abrir modal de nro orden con detalle del pedido ********************************/
export function abrirCerrarModalDetallePedidoAction(estadoModalNroOrden) {
    return (dispatch) => {
        if (estadoModalNroOrden) {
            dispatch(abrirModalDetallePedido(estadoModalNroOrden));
        } else {
            dispatch(cerrarModalDetallePedido(estadoModalNroOrden));
        }
    }
}

const abrirModalDetallePedido = estadoModalNroOrden => ({
    type: ABRIR_MODAL_DETALLE_PEDIDO,
    payload: estadoModalNroOrden
})

const cerrarModalDetallePedido = estadoModalNroOrden => ({
    type: CERRAR_MODAL_DETALLE_PEDIDO,
    payload: estadoModalNroOrden
})

/**********************  para obtener los ingredientes de la BBDD ********************************/
export function obtenerIngredientesAction() {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/menudetail`, header)
                .then(response => {
                    dispatch(descargarListadoMenuDetalleExito(response.data.menudetails));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarMenuDetalleError('Error al descargar los menu detalle'));
        }

    }
}

const descargarListadoMenuDetalleExito = lista_MenuDetalle => ({
    type: DESCARGA_LISTADO_MENU_DETALLE,
    payload: lista_MenuDetalle
})

const descargarMenuDetalleError = errores => ({
    type: DESCARGA_MENU_DETALLE_ERROR,
    payload: errores,
});

/**********************  para obtener los pedidos de la BBDD ********************************/
export function obtenerPedidosAction() {
    return async (dispatch) => {
        dispatch(descargarPedidos());

        // dependiendo del rol del usuario logueado _> muestro una orden u otra.

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get('/api/order', header)
                .then(response => {
                    // obtenemos datos del response
                    const { orders } = response.data;
                    // si todo sale bien
                    dispatch(descargarPedidosExito(orders));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarPedidosError(err.response.data.msg));
        }

    }
}

const descargarPedidos = () => ({
    type: COMENZAR_DESCARGA_PEDIDOS,
    payload: true
});

const descargarPedidosExito = respuesta => ({
    type: DESCARGA_PEDIDOS_EXITO,
    payload: respuesta,
});

const descargarPedidosError = errores => ({
    type: DESCARGA_PEDIDOS_ERROR,
    payload: errores,
});

/********************** Entrar a CRUD PEDIDOS ***********************/
export function pantallaPedidosAction(estadoPedido) {
    return (dispatch) => {
        dispatch(pantallaPedidos(estadoPedido))
    }
}

const pantallaPedidos = estadoPedido => ({
    type: ENTRAR_CRUD_PEDIDOS,
    payload: estadoPedido
})

/**********************  para buscar una insumo de la BBDD ********************************/
export function obtenerInsumoBuscadorAction(indexPrimerUsuario, limit, pagina, palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarInsumos());

        if (palabraBusqueda === null || palabraBusqueda === '') {
            palabraBusqueda = undefined
        }

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            await clienteAxios.get(`/api/product/search/${palabraBusqueda}?from=${indexPrimerUsuario}&limit=${limit}`, header)
                .then(response => {

                    const datosPaginacion = {
                        indexPrimerUsuario,
                        limit,
                        busqueda: palabraBusqueda,
                        pagina,
                    }

                    response.data.datosPaginacion = datosPaginacion;

                    dispatch(descargarInsumosExito(response.data));
                })
        } catch (error) {
            console.log(error);
            dispatch(descargarInsumosError('Error al buscar los insumos'));
        }
    }
}


const descargarInsumos = () => ({
    type: COMENZAR_DESCARGA_INSUMO,
    payload: true
});

const descargarInsumosExito = respuesta => ({
    type: DESCARGA_INSUMO_EXITO,
    payload: respuesta,
});

const descargarInsumosError = errores => ({
    type: DESCARGA_INSUMO_ERROR,
    payload: errores,
});

/**********************  para buscar una categoria-insumo de la BBDD ********************************/
export function obtenerCategoriasInsumoBuscadorAction(indexPrimerUsuario, limit, pagina, palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarCategoriasInsumo());

        if (palabraBusqueda === null || palabraBusqueda === '') {
            palabraBusqueda = undefined
        }

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            await clienteAxios.get(`/api/product-categories/search/${palabraBusqueda}?from=${indexPrimerUsuario}&limit=${limit}`, header)
                .then(response => {

                    const datosPaginacion = {
                        indexPrimerUsuario,
                        limit,
                        busqueda: palabraBusqueda,
                        pagina,
                    }

                    response.data.datosPaginacion = datosPaginacion;
                    dispatch(descargarCategoriasInsumoExito(response.data));
                })
        } catch (error) {
            console.log(error);
            dispatch(descargarCategoriasInsumoError('Error al buscar las categorias de insumo'));
        }
    }
}

const descargarCategoriasInsumo = () => ({
    type: COMENZAR_DESCARGA_CATEGORIA_INSUMO,
    payload: true
});

const descargarCategoriasInsumoExito = respuesta => ({
    type: DESCARGA_CATEGORIA_INSUMO_EXITO,
    payload: respuesta,
});

const descargarCategoriasInsumoError = errores => ({
    type: DESCARGA_CATEGORIA_INSUMO_ERROR,
    payload: errores,
});

/**********************  para buscar un menu de la BBDD ********************************/
export function obtenerMenusBuscadorAction(indexPrimerUsuario, limit, pagina, palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarMenus());

        if (palabraBusqueda === null || palabraBusqueda === '') {
            palabraBusqueda = undefined
        }

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            await clienteAxios.get(`/api/menu/search/${palabraBusqueda}?from=${indexPrimerUsuario}&limit=${limit}`, header)
                .then(response => {

                    const datosPaginacion = {
                        indexPrimerUsuario,
                        limit,
                        busqueda: palabraBusqueda,
                        pagina,
                    }

                    response.data.datosPaginacion = datosPaginacion;

                    dispatch(descargarMenusExito(response.data));
                })
        } catch (error) {
            console.log(error);
            dispatch(descargarMenusError('Error al buscar los menus'));
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

/**********************  para buscar una categoria de la BBDD ********************************/
export function obtenerCategoriasBuscadorAction(indexPrimerUsuario, limit, pagina, palabraBusqueda) {
    return async (dispatch) => {

        dispatch(descargarCategorias());

        if (palabraBusqueda === null || palabraBusqueda === '') {
            palabraBusqueda = undefined
        }

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            await clienteAxios.get(`/api/menu-categories/search/${palabraBusqueda}?from=${indexPrimerUsuario}&limit=${limit}`, header)
                .then(response => {

                    const datosPaginacion = {
                        indexPrimerUsuario,
                        limit,
                        busqueda: palabraBusqueda,
                        pagina,
                    }

                    response.data.datosPaginacion = datosPaginacion;

                    dispatch(descargarCategoriasExito(response.data));
                })

        } catch (error) {
            console.log(error);
            dispatch(descargarCategoriasError('Error al buscar las categorias'));
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

/**********************  para buscar un usuario de la BBDD ********************************/
export function obtenerUsuariosBuscadorAction(indexPrimerUsuario, limit, pagina, palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarUsuarios());

        if (palabraBusqueda === null || palabraBusqueda === '') {
            palabraBusqueda = undefined
        }
        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/users/search/${palabraBusqueda}?from=${indexPrimerUsuario}&limit=${limit}`, header)
                .then(response => {

                    const datosPaginacion = {
                        indexPrimerUsuario,
                        limit,
                        busqueda: palabraBusqueda,
                        pagina,
                    }

                    response.data.datosPaginacion = datosPaginacion;

                    dispatch(descargarUsuariosExito(response.data));

                })
        } catch (error) {
            console.log(error);
            dispatch(descargarUsuariosError('Error al buscar los usuarios'));
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

/**********************  para editar un insumo de la BBDD ********************************/
export function obtenerUnInsumoAction(datos_insumos) {
    return async (dispatch) => {
        dispatch(editarInsumo(datos_insumos))
    }
}

export function editarInsumoAction(datos_insumos, imageFile) {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            if (imageFile !== null) {
                const formData = new FormData();
                formData.append('file', imageFile.img);

                await clienteAxios.put(`/api/upload/products/${datos_insumos._id}`, formData, header)
                    .then(response => {
                        clienteAxios.put(`/api/product-categories/${response.data.result._id}`, response.data.result, header)
                        dispatch(editarInsumoExito(response.data.result));
                    })
            } else {
                await clienteAxios.put(`/api/product/${datos_insumos._id}`, datos_insumos, header)
                    .then(response => {
                        const { product } = response.data;
                        dispatch(editarInsumoExito(product));
                    })
            }
        } catch (err) {
            if (err.response.data.msg !== undefined) {
                dispatch(editarInsumoError(err.response.data.msg));
            } else {
                if (err.response.data.err.errors) {
                    dispatch(editarInsumoErrores(err.response.data.err.errors));
                }
            }
        }
    }
}

const editarInsumo = insumo => ({
    type: OBTENER_INSUMO_EDITAR,
    payload: insumo
})

const editarInsumoExito = insumo => ({
    type: INSUMO_EDITADO_EXITO,
    payload: insumo
})

const editarInsumoErrores = errores => ({
    type: INSUMO_EDITADO_ERRORES,
    payload: errores,
});

const editarInsumoError = msj => ({
    type: INSUMO_EDITADO_ERROR,
    payload: msj
})

/**********************  para eliminar los insumos de la BBDD ********************************/
export function eliminarInsumoAction(datos_insumos) {
    return async (dispatch) => {
        dispatch(obtenerInsumoEliminar(datos_insumos._id));

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.delete(`/api/product/${datos_insumos._id}`, header)
            dispatch(insumoEliminadoExito(datos_insumos));
            Swal.fire(
                'Eliminado!',
                'El insumo se eliminó correctamente.',
                'success'
            )
        } catch (err) {
            console.log(err);
            dispatch(insumoEliminadoError('Error al eliminar el insumo'));
        }
    }
}

const obtenerInsumoEliminar = idInsumo => ({
    type: OBTENER_INSUMO_ELIMINAR,
    payload: idInsumo
})

const insumoEliminadoExito = datos_insumos => ({
    type: INSUMO_ELIMINADO_EXITO,
    payload: datos_insumos
})

const insumoEliminadoError = msj => ({
    type: INSUMO_ELIMINADO_ERROR,
    payload: msj
})

/**********************  para obtener los insumos de la BBDD ********************************/
export function obtenerInsumosAction() {
    return async (dispatch) => {
        dispatch(descargarInsumos());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/product`, header)
                .then(response => {
                    console.log(response.data);
                    dispatch(descargarListadoInsumosExito(response.data));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarInsumosError('Error al descargar los insumos'));
        }

    }
}

const descargarListadoInsumosExito = lista_insumos => ({
    type: DESCARGA_LISTADO_INSUMOS,
    payload: lista_insumos
})

/**********************  para crear una nueva insumo ********************************/
export function crearNuevaInsumoAction(datosNuevoInsumo, imageFile) {
    return async (dispatch) => {
        dispatch(agregarInsumo());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            if (imageFile !== null) {
                await clienteAxios.post('/api/product', datosNuevoInsumo, header)
                    .then(response => {
                        const formData = new FormData();
                        formData.append('file', imageFile.img);
                        if (!response.data.productStored) {
                            const { product } = response.data;

                            clienteAxios.put(`/api/upload/products/${product._id}`, formData, header)

                            dispatch(agregarInsumoExito(product));
                        } else {
                            const { productStored } = response.data;

                            clienteAxios.put(`/api/upload/products/${productStored._id}`, formData, header)

                            dispatch(agregarInsumoExito(productStored));
                        }
                    })
            } else {
                await clienteAxios.post('/api/product', datosNuevoInsumo, header)
                    .then(response => {
                        if (!response.data.productStored) {
                            const { product } = response.data;
                            dispatch(agregarInsumoExito(product));
                        } else {
                            const { productStored } = response.data;
                            dispatch(agregarInsumoExito(productStored));
                        }
                    })
            }
        } catch (err) {
            console.log(err);
            if (err.response.data.msg !== undefined) {
                dispatch(agregarInsumoError(err.response.data.msg));
            } else {
                if (err.response.data.err.errors) {
                    dispatch(agregarInsumoErrores(err.response.data.err.errors));
                }
            }
        }
    }
}

const agregarInsumo = () => ({
    type: AGREGAR_INSUMO,
    payload: true
})

// si el producto se guarda en la BBDD
const agregarInsumoExito = datosNuevoInsumo => ({
    type: AGREGAR_INSUMO_EXITO,
    payload: datosNuevoInsumo
});

// si hubo un error
const agregarInsumoErrores = errores => ({
    type: AGREGAR_INSUMO_ERRORES,
    payload: errores
})

// si hubo un error
const agregarInsumoError = error => ({
    type: AGREGAR_INSUMO_ERROR,
    payload: error
})

/**********************  para abrir modal agregar insumo ********************************/
export function abrirCerrarAgregarInsumoAction(estadoAgregarInsumo) {
    return (dispatch) => {
        if (estadoAgregarInsumo) {
            dispatch(abrirAgregarInsumo(estadoAgregarInsumo));
        } else {
            dispatch(cerrarAgregarInsumo(estadoAgregarInsumo));
        }
    }
}

const abrirAgregarInsumo = estadoAgregarInsumo => ({
    type: ABRIR_AGREGAR_INSUMO,
    payload: estadoAgregarInsumo
})

const cerrarAgregarInsumo = estadoAgregarInsumo => ({
    type: CERRAR_AGREGAR_INSUMO,
    payload: estadoAgregarInsumo
})

/**********************  para editar una categoria de insumo de la BBDD ********************************/
export function obtenerUnaCategoriaInsumoAction(datos_categoria_insumos) {
    return async (dispatch) => {
        dispatch(editarCategoriaInsumo(datos_categoria_insumos))
    }
}

export function editarCategoriaInsumoAction(datos_categoria_insumos, imageFile) {
    return async (dispatch) => {

        if (datos_categoria_insumos.description === '') {
            dispatch(agregarUsuarioError('La descripcion es obligatoria'));
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            if (imageFile !== null) {
                const formData = new FormData();
                formData.append('file', imageFile.img);

                await clienteAxios.put(`/api/upload/product-categories/${datos_categoria_insumos._id}`, formData, header)
                    .then(response => {
                        clienteAxios.put(`/api/product-categories/${response.data.result._id}`, response.data.result, header)
                        dispatch(editarCategoriaInsumoExito(response.data.result));
                    })
            } else {
                await clienteAxios.put(`/api/product-categories/${datos_categoria_insumos._id}`, datos_categoria_insumos, header)
                    .then(response => {
                        const { productCategory } = response.data;
                        dispatch(editarCategoriaInsumoExito(productCategory));
                    })
            }
        } catch (err) {
            console.log(err);
            if (err.response.data.msg !== undefined) {
                dispatch(editarCategoriaInsumoError(err.response.data.msg));
            } else {
                if (err.response.data.err.errors) {
                    dispatch(editarCategoriaInsumoErrores(err.response.data.err.errors));
                }
            }
        }
    }
}

const editarCategoriaInsumo = categoriaInsumo => ({
    type: OBTENER_CATEGORIA_INSUMO_EDITAR,
    payload: categoriaInsumo
})

const editarCategoriaInsumoExito = categoriaInsumo => ({
    type: CATEGORIA_INSUMO_EDITADO_EXITO,
    payload: categoriaInsumo
})

const editarCategoriaInsumoErrores = errores => ({
    type: CATEGORIA_INSUMO_EDITADO_ERRORES,
    payload: errores,
});

const editarCategoriaInsumoError = msj => ({
    type: CATEGORIA_INSUMO_EDITADO_ERROR,
    payload: msj
})

/**********************  para eliminar las categoria insumos de la BBDD ********************************/
export function eliminarCategoriaInsumoAction(datos_categoria_insumos) {
    return async (dispatch) => {
        dispatch(obtenerCategoriaInsumoEliminar(datos_categoria_insumos._id));
        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.delete(`/api/product-categories/${datos_categoria_insumos._id}`, header)
            dispatch(categoriaInsumoEliminadoExito(datos_categoria_insumos));
            Swal.fire(
                'Eliminado!',
                'El categoria insumo se eliminó correctamente.',
                'success'
            )
        } catch (err) {
            console.log(err);
            dispatch(categoriaInsumoEliminadoError('Error al eliminar el categoria insumo'));
        }
    }
}

const obtenerCategoriaInsumoEliminar = idcategoriaInsumo => ({
    type: OBTENER_CATEGORIA_INSUMO_ELIMINAR,
    payload: idcategoriaInsumo
})

const categoriaInsumoEliminadoExito = datos_categoria_insumos => ({
    type: CATEGORIA_INSUMO_ELIMINADO_EXITO,
    payload: datos_categoria_insumos
})

const categoriaInsumoEliminadoError = msj => ({
    type: CATEGORIA_INSUMO_ELIMINADO_ERROR,
    payload: msj
})

/**********************  para obtener las categoria insumos de la BBDD ********************************/
export function obtenerCategoriaInsumoAction() {
    return async (dispatch) => {
        dispatch(descargarCategoriasInsumo());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/product-categories`, header)
                .then(response => {
                    dispatch(obtenerListadoCategoriasInsumo(response.data));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarCategoriasInsumoError('Error al descargar las categorias insumo'));
        }
    }
}

const obtenerListadoCategoriasInsumo = categoriasInsumo => ({
    type: DESCARGA_LISTADO_CATEGORIA_INSUMO,
    payload: categoriasInsumo
})

/**********************  para obtener las categoria insumos de la BBDD ********************************/
export function obtenerCategoriaInsumoFiltradasPorParentAction(idParent) {
    return async (dispatch) => {
        dispatch(descargarCategoriasInsumo());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/product-categories/filter/${idParent}`, header)
                .then(response => {
                    dispatch(obtenerListadoCategoriasInsumo(response.data));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarCategoriasInsumoError('Error al descargar las categorias insumo'));
        }
    }
}

/**********************  para crear una nueva categoria-insumo ********************************/
export function crearNuevaCategoriaInsumoAction(datosNuevoCategoriaInsumo, imageFile) {
    return async (dispatch) => {
        dispatch(agregarCategoriaInsumo());

        try {

            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            if (imageFile !== null) {
                await clienteAxios.post('/api/product-categories', datosNuevoCategoriaInsumo, header)
                    .then(response => {
                        const formData = new FormData();
                        formData.append('file', imageFile.img);
                        if (!response.data.productCategoryStored) {
                            const { productCategory } = response.data;

                            clienteAxios.put(`/api/upload/product-categories/${productCategory._id}`, formData, header)

                            dispatch(agregarCategoriaInsumoExito(productCategory));
                        } else {
                            const { productCategoryStored } = response.data;

                            clienteAxios.put(`/api/upload/product-categories/${productCategoryStored._id}`, formData, header)

                            dispatch(agregarCategoriaInsumoExito(productCategoryStored));
                        }
                    })
            } else {
                await clienteAxios.post('/api/product-categories', datosNuevoCategoriaInsumo, header)
                    .then(response => {
                        if (!response.data.productCategoryStored) {
                            const { productCategory } = response.data;
                            dispatch(agregarCategoriaInsumoExito(productCategory));
                        } else {
                            const { productCategoryStored } = response.data;

                            dispatch(agregarCategoriaInsumoExito(productCategoryStored));
                        }
                    })
            }
        } catch (err) {
            if (err.response.data.msg !== undefined) {
                dispatch(agregarCategoriaInsumoError(err.response.data.msg));
            } else {
                if (err.response.data.err.errors) {
                    dispatch(agregarCategoriaInsumoErrores(err.response.data.err.errors));
                }
            }
        }
    }
}

const agregarCategoriaInsumo = () => ({
    type: AGREGAR_CATEGORIA_INSUMO,
    payload: true
})

// si el producto se guarda en la BBDD
const agregarCategoriaInsumoExito = datosNuevoCategoriaInsumo => ({
    type: AGREGAR_CATEGORIA_INSUMO_EXITO,
    payload: datosNuevoCategoriaInsumo
});

// si hubo un error
const agregarCategoriaInsumoErrores = errores => ({
    type: AGREGAR_CATEGORIA_INSUMO_ERRORES,
    payload: errores
})

// si hubo un error
const agregarCategoriaInsumoError = msj => ({
    type: AGREGAR_CATEGORIA_INSUMO_ERROR,
    payload: msj
})

/**********************  para abrir modal agregar categoria-insumo ********************************/
export function abrirCerrarAgregarCategoriaInsumoAction(estadoAgregarCategoriaInsumo) {
    return (dispatch) => {
        if (estadoAgregarCategoriaInsumo) {
            dispatch(abrirAgregarCategoriaInsumo(estadoAgregarCategoriaInsumo));
        } else {
            dispatch(cerrarAgregarCategoriaInsumo(estadoAgregarCategoriaInsumo));
        }
    }
}

const abrirAgregarCategoriaInsumo = estadoAgregarCategoriaInsumo => ({
    type: ABRIR_AGREGAR_CATEGORIA_INSUMO,
    payload: estadoAgregarCategoriaInsumo
})

const cerrarAgregarCategoriaInsumo = estadoAgregarCategoriaInsumo => ({
    type: CERRAR_AGREGAR_CATEGORIA_INSUMO,
    payload: estadoAgregarCategoriaInsumo
})


/**********************  para editar un menu de la BBDD ********************************/
export function obtenerUnMenuAction(datos_menu, IngredientesDB) {
    return async (dispatch) => {
        console.log(IngredientesDB);
        dispatch(editarMenu(datos_menu));
        for (const ingrediente of IngredientesDB) {
            if (ingrediente.menu._id === datos_menu._id) {
                console.log(ingrediente);
                dispatch(editarMenuIngredientes(ingrediente));
            }
        }
    }
}

const editarMenuIngredientes = ingrediente => ({
    type: OBTENER_MENU_DETALLE_EDITAR,
    payload: ingrediente
})

export function editarMenuAction(datos_menu, imageFile, ingredientesIniciales, ingredientesFinales) {
    return async (dispatch) => {
        console.log(ingredientesIniciales);
        console.log(ingredientesFinales);

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            if (imageFile !== null) {
                const formData = new FormData();
                formData.append('file', imageFile.img);

                await clienteAxios.put(`/api/upload/menus/${datos_menu._id}`, formData, header)
                    .then(response => {
                        clienteAxios.put(`/api/menu/${response.data.result._id}`, datos_menu, header);
                        dispatch(editarMenuExito(response.data.result));

                        // Debemos eliminar los ingredientes iniciales del menu.
                        for (const ingrediente of ingredientesIniciales) {
                            if (ingrediente.menu._id === datos_menu._id) {
                                clienteAxios.delete(`/api/menudetail/${ingrediente._id}`, header);
                            }
                        }

                        // Agregamos todos los ingredientes nuevamente
                        for (const ingrediente of ingredientesFinales) {
                            ingrediente.menu = response.data.result._id;
                            delete ingrediente.description;
                            clienteAxios.post(`/api/menudetail`, ingrediente, header);
                        }

                    })
            } else {
                clienteAxios.put(`/api/menu/${datos_menu._id}`, datos_menu, header)
                    .then(response => {
                        const { menu } = response.data;
                        dispatch(editarMenuExito(menu));

                        // Debemos eliminar los ingredientes iniciales del menu.
                        for (const ingrediente of ingredientesIniciales) {
                            if (ingrediente.menu._id === datos_menu._id) {
                                clienteAxios.delete(`/api/menudetail/${ingrediente._id}`, header);
                            }
                        }

                        // Agregamos todos los ingredientes nuevamente
                        for (const ingrediente of ingredientesFinales) {
                            ingrediente.menu = menu._id;
                            delete ingrediente.description;
                            clienteAxios.post(`/api/menudetail`, ingrediente, header);
                        }

                    })
            }
        } catch (err) {
            console.log(err.response);
            if (err.response.data.msg !== undefined) {
                dispatch(editarMenuError(err.response.data.msg));
            } else {
                if (err.response.data.err.errors) {
                    dispatch(editarMenuErrores(err.response.data.err.errors));
                }
            }
        }
    }
}

const editarMenu = menu => ({
    type: OBTENER_MENU_EDITAR,
    payload: menu
})

const editarMenuExito = menu => ({
    type: MENU_EDITADO_EXITO,
    payload: menu
})

const editarMenuErrores = errores => ({
    type: MENU_EDITADO_ERRORES,
    payload: errores,
});

const editarMenuError = msj => ({
    type: MENU_EDITADO_ERROR,
    payload: msj
})

/**********************  para eliminar un menu de la BBDD ********************************/
export function eliminarMenuAction(datos_menu, ingredientesDB) {
    return async (dispatch) => {
        dispatch(obtenerMenuEliminar(datos_menu._id));
        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.delete(`/api/menu/${datos_menu._id}`, header)
                .then(response => {

                    // Debemos eliminar los ingredientes del menu.
                    for (const ingrediente of ingredientesDB) {
                        if (ingrediente.menu._id === datos_menu._id) {
                            clienteAxios.delete(`/api/menudetail/${ingrediente._id}`, header);
                        }
                    }

                    dispatch(menuEliminadoExito(datos_menu));
                    Swal.fire(
                        'Eliminado!',
                        'El menu se eliminó correctamente.',
                        'success'
                    )
                })
        } catch (err) {
            console.log(err);
            dispatch(menuEliminadoError('Error al eliminar el menu'));
        }
    }
}

const obtenerMenuEliminar = idmenu => ({
    type: OBTENER_MENU_ELIMINAR,
    payload: idmenu
})

const menuEliminadoExito = datos_menu => ({
    type: MENU_ELIMINADO_EXITO,
    payload: datos_menu
})

const menuEliminadoError = msj => ({
    type: MENU_ELIMINADO_ERROR,
    payload: msj
})

/**********************  para obtener los menus de la BBDD ********************************/
export function obtenerMenuAction() {
    return async (dispatch) => {
        dispatch(descargarMenus());
        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/menu/menuAll`, header)
                .then(response => {
                    dispatch(descargarListadoMenusExito(response.data));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarMenusError('Error al descargar los menus'));
        }
    }
}

const descargarListadoMenusExito = menus => ({
    type: DESCARGA_LISTADO_MENUS,
    payload: menus
})

/**********************  para crear una nuevo menu *********************************/
export function crearNuevoMenuAction(datosNuevoMenu, imageFile, ingredientes) {
    return async (dispatch) => {
        dispatch(agregarMenu());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            if (imageFile !== null) {
                await clienteAxios.post('/api/menu', datosNuevoMenu, header)
                    .then(response => {

                        const formData = new FormData();
                        formData.append('file', imageFile.img);

                        if (!response.data.menuStored) {
                            const { menu } = response.data;

                            clienteAxios.put(`/api/upload/menus/${menu._id}`, formData, header)
                            dispatch(agregarMenuExito(menu));

                            for (const ingrediente of ingredientes) {
                                ingrediente.menu = menu._id;
                                delete ingrediente.description;
                                clienteAxios.post(`/api/menudetail`, ingrediente, header);
                            }

                        } else {
                            const { menuStored } = response.data;   // menus con status=false a status=true

                            clienteAxios.put(`/api/upload/menus/${menuStored._id}`, formData, header)
                            dispatch(agregarMenuExito(menuStored));

                            for (const ingrediente of ingredientes) {
                                ingrediente.menu = menuStored._id;
                                delete ingrediente.description;
                                clienteAxios.post(`/api/menudetail`, ingrediente, header);
                            }

                        }
                    })
            } else {
                await clienteAxios.post('/api/menu', datosNuevoMenu, header)
                    .then(response => {
                        if (!response.data.menuStored) {
                            const { menu } = response.data;
                            dispatch(agregarMenuExito(menu));

                            for (const ingrediente of ingredientes) {
                                ingrediente.menu = menu._id;
                                delete ingrediente.description;
                                clienteAxios.post(`/api/menudetail`, ingrediente, header);
                            }

                        } else {
                            const { menuStored } = response.data;
                            dispatch(agregarMenuExito(menuStored));

                            for (const ingrediente of ingredientes) {
                                ingrediente.menu = menuStored._id;
                                delete ingrediente.description;
                                console.log(ingrediente);
                                clienteAxios.post(`/api/menudetail`, ingrediente, header);
                            }
                        }
                    })
            }
        } catch (err) {
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

export function editarCategoriaAction(datos_categoria, imageFile) {
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

            if (imageFile !== null) {
                const formData = new FormData();
                formData.append('file', imageFile.img);

                await clienteAxios.put(`/api/upload/menu-categories/${datos_categoria._id}`, formData, header)
                    .then(response => {
                        clienteAxios.put(`/api/menu-categories/${response.data.result._id}`, response.data.result, header);
                        dispatch(editarCategoriaExito(response.data.result));
                    })
            } else {
                await clienteAxios.put(`/api/menu-categories/${datos_categoria._id}`, datos_categoria, header)
                    .then(response => {
                        const { menuCategory } = response.data;
                        dispatch(editarCategoriaExito(menuCategory));
                    })
            }
        } catch (err) {
            console.log(err.response);
            if (err.response.data.msg !== undefined) {
                dispatch(editarCategoriaError(err.response.data.msg));
            } else {
                if (err.response.data.err.errors) {
                    dispatch(editarCategoriaErrores(err.response.data.err.errors));
                }
            }
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

const editarCategoriaErrores = errores => ({
    type: CATEGORIA_EDITADO_ERRORES,
    payload: errores,
});

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

            await clienteAxios.get(`/api/menu-categories`, header)
                .then(response => {
                    dispatch(obtenerListadoCategoria(response.data));
                })

        } catch (err) {
            console.log(err);
            dispatch(descargarCategoriasError("Error al obtener las categorias"));
        }

    }
}

const obtenerListadoCategoria = categorias => ({
    type: DESCARGA_LISTADO_CATEGORIA,
    payload: categorias
})

/**********************  para crear una nueva categoria ********************************/
export function crearNuevaCategoriaAction(datosNuevaCategoria, imageFile) {
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

            if (imageFile !== null) {
                await clienteAxios.post('/api/menu-categories', datosNuevaCategoria, header)
                    .then((response) => {

                        const formData = new FormData();
                        formData.append('file', imageFile.img);

                        if (!response.data.menuCategoryStored) {
                            const { category } = response.data;

                            clienteAxios.put(`/api/upload/menu-categories/${category._id}`, formData, header)

                            dispatch(agregarCategoriaExito(category));
                        } else {
                            const { menuCategoryStored } = response.data;   // menus con status=false a status=true
                            clienteAxios.put(`/api/upload/menu-categories/${menuCategoryStored._id}`, formData, header)

                            dispatch(agregarCategoriaExito(menuCategoryStored));
                        }
                    })
            } else {
                await clienteAxios.post('/api/menu-categories', datosNuevaCategoria, header)
                    .then(response => {

                        if (!response.data.menuCategoryStored) {
                            const { category } = response.data;

                            dispatch(agregarCategoriaExito(category));
                        } else {
                            const { menuCategoryStored } = response.data;

                            dispatch(agregarCategoriaExito(menuCategoryStored));
                        }
                    })
            }
        } catch (err) {
            console.log(err.response);
            if (err.response.data.msg !== undefined) {
                dispatch(agregarCategoriaError(err.response.data.msg));
            } else {
                if (err.response.data.err.errors) {
                    dispatch(agregarCategoriaErrores(err.response.data.err.errors));
                }
            }
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

// si hubo un error
const agregarCategoriaErrores = errores => ({
    type: AGREGAR_CATEGORIA_ERRORES,
    payload: errores
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

/********************** Entrar a CRUD CATEGORIA INSUMO ***********************/
export function pantallaCategoriaInsumoAction(estadoCategoriaInsumo) {
    return (dispatch) => {
        dispatch(pantallaCategoriaInsumo(estadoCategoriaInsumo))
    }
}

const pantallaCategoriaInsumo = estado => ({
    type: ENTRAR_CRUD_CATEGORIA_INSUMOS,
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

/**********************  para obtener usuarios por id de la BBDD ********************************/
export function obtenerUsuariosAction() {
    return async (dispatch) => {
        dispatch(descargarUsuarios());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            await clienteAxios.get(`/api/users`, header)
                .then(response => {
                    dispatch(descargarUsuarioExito(response.data));
                })
        } catch (error) {
            console.log(error);
            dispatch(descargarUsuariosError('Error al descargar el id del usuario'));
        }
    }
}

const descargarUsuarioExito = users => ({
    type: DESCARGA_USER_ID,
    payload: users
})

/**********************  para crear un nuevo usuario ********************************/
export function crearNuevoUsuarioAction(datosNuevoUsuario) {
    return async (dispatch) => {
        dispatch(agregarUsuario());

        const { name, email, password, telephoneNumber, role } = datosNuevoUsuario;

        // validar campos vacios
        if (name === '' || email === '' || password === '' || role === '') {
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
            console.log(error.response.data.msg);
            // si hay un error
            dispatch(agregarUsuarioError(error.response.data.msg));
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