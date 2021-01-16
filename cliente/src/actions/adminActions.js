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
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
import { authorizationHeader } from '../helpers/authorization_header';

/**********************  para buscar una insumo de la BBDD ********************************/
export function obtenerInsumoBuscadorAction(palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarInsumos());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            if (!palabraBusqueda.busqueda) {
                const respuesta = await clienteAxios.get('/api/product', header);
                dispatch(descargarInsumosExito(respuesta.data.products));
            } else {
                await clienteAxios.get(`/api/product/search/${String(palabraBusqueda.busqueda)}`, header)
                    .then(response => {
                        const { products } = response.data;
                        dispatch(descargarInsumosExito(products));
                    })
            }
        } catch (error) {
            console.log(error);
            dispatch(descargarInsumosError('Error al buscar los insumos'));
        }
    }
}

/**********************  para buscar una categoria-insumo de la BBDD ********************************/
export function obtenerCategoriasInsumoBuscadorAction(palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarCategoriasInsumo());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            if (!palabraBusqueda.busqueda) {
                const respuesta = await clienteAxios.get('/api/product-categories', header);
                dispatch(descargarCategoriasInsumoExito(respuesta.data.productCategories));
            } else {
                await clienteAxios.get(`/api/product-categories/search/${String(palabraBusqueda.busqueda)}`, header)
                    .then(response => {
                        const { productCategories } = response.data;
                        dispatch(descargarCategoriasInsumoExito(productCategories));
                    })
            }
        } catch (error) {
            console.log(error);
            dispatch(descargarCategoriasInsumoError('Error al buscar las categorias de insumo'));
        }
    }
}

/**********************  para buscar un menu de la BBDD ********************************/
export function obtenerMenusBuscadorAction(palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarMenus());
        console.log(palabraBusqueda.busqueda);

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            if (!palabraBusqueda.busqueda) {
                const respuesta = await clienteAxios.get('/api/menu', header);
                dispatch(descargarMenusExito(respuesta.data.menus));
            } else {
                await clienteAxios.get(`/api/menu/search/${String(palabraBusqueda.busqueda)}`, header)
                    .then(response => {
                        console.log(response.data);
                        const { menus } = response.data;
                        dispatch(descargarMenusExito(menus));
                    })
            }
        } catch (error) {
            console.log(error);
            dispatch(descargarMenusError('Error al buscar los menus'));
        }
    }
}

/**********************  para buscar una categoria de la BBDD ********************************/
export function obtenerCategoriasBuscadorAction(palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarCategorias());
        console.log(palabraBusqueda.busqueda);

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            if (!palabraBusqueda.busqueda) {
                const respuesta = await clienteAxios.get('/api/menu-categories', header);
                dispatch(descargarCategoriasExito(respuesta.data.categories));
            } else {
                await clienteAxios.get(`/api/menu-categories/search/${String(palabraBusqueda.busqueda)}`, header)
                    .then(response => {
                        const { menuCategories } = response.data;
                        dispatch(descargarCategoriasExito(menuCategories));
                    })
            }
        } catch (error) {
            console.log(error);
            dispatch(descargarCategoriasError('Error al buscar las categorias'));
        }
    }
}

/**********************  para editar un insumo de la BBDD ********************************/
export function obtenerUnInsumoAction(datos_insumos) {
    return async (dispatch) => {
        dispatch(editarInsumo(datos_insumos))
    }
}

export function editarInsumoAction(datos_insumos) {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.put(`/api/product/${datos_insumos._id}`, datos_insumos, header)
                .then(response => {
                    console.log(response.data);
                    const { product } = response.data;
                    dispatch(editarInsumoExito(product));
                })

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
export function obtenerInsumosAction(indexPrimerInsumo, limit, paginaCorriente) {
    return async (dispatch) => {
        dispatch(descargarInsumos());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/product?from=${indexPrimerInsumo}&limit=${limit}`, header)
                .then(response => {
                    response.data.paginaCorriente = paginaCorriente;
                    dispatch(descargarInsumosExito(response.data));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarInsumosError('Error al descargar los insumos'));
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

/**********************  para crear una nueva insumo ********************************/
export function crearNuevaInsumoAction(datosNuevoInsumo) {
    return async (dispatch) => {
        dispatch(agregarInsumo());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            console.log(datosNuevoInsumo);
            await clienteAxios.post('/api/product', datosNuevoInsumo, header)
                .then(response => {
                    console.log(response);
                    if (!response.data.productStored) {
                        const { product } = response.data;
                        dispatch(agregarInsumoExito(product));
                    } else {
                        const { productStored } = response.data;
                        dispatch(agregarInsumoExito(productStored));
                        console.log(response.data.msg);
                    }
                })
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

export function editarCategoriaInsumoAction(datos_categoria_insumos) {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.put(`/api/product-categories/${datos_categoria_insumos._id}`, datos_categoria_insumos, header)
                .then(response => {
                    console.log(response.data);
                    const { productCategory } = response.data;
                    dispatch(editarCategoriaInsumoExito(productCategory));
                })

        } catch (err) {
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
        console.log(datos_categoria_insumos);
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
export function obtenerCategoriaInsumoAction(indexPrimerInsumoCategoria, limit, paginaCorriente) {
    return async (dispatch) => {
        dispatch(descargarCategoriasInsumo());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/product-categories?from=${indexPrimerInsumoCategoria}&limit=${limit}`, header)
                .then(response => {
                    response.data.paginaCorriente = paginaCorriente;
                    dispatch(descargarCategoriasInsumoExito(response.data));
                })
        } catch (err) {
            console.log(err);
            dispatch(descargarCategoriasInsumoError('Error al descargar los menus'));
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

/**********************  para crear una nueva categoria-insumo ********************************/
export function crearNuevaCategoriaInsumoAction(datosNuevoCategoriaInsumo, imageFile) {
    return async (dispatch) => {
        dispatch(agregarCategoriaInsumo());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            const formData = new FormData();
            formData.append('file', imageFile.img);

            await clienteAxios.post('/api/product-categories', datosNuevoCategoriaInsumo, header)
                .then(response => {
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
export function obtenerUnMenuAction(datos_menu) {
    return async (dispatch) => {
        dispatch(editarMenu(datos_menu))
    }
}

export function editarMenuAction(datos_menu, imageFile) {
    return async (dispatch) => {

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            const formData = new FormData();
            formData.append('file', imageFile.img);

            clienteAxios.put(`/api/upload/menus/${datos_menu._id}`, formData, header)
                .then(response => {
                    clienteAxios.put(`/api/menu/${response.data.result._id}`, datos_menu, header);
                    dispatch(editarMenuExito(response.data.result));
                })
        } catch (err) {
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
export function eliminarMenuAction(datos_menu) {
    return async (dispatch) => {
        dispatch(obtenerMenuEliminar(datos_menu._id));
        console.log(datos_menu);
        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.delete(`/api/menu/${datos_menu._id}`, header)
            dispatch(menuEliminadoExito(datos_menu));
            Swal.fire(
                'Eliminado!',
                'El menu se eliminó correctamente.',
                'success'
            )
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
export function obtenerMenuAction(indexPrimerUsuario, limit, paginaCorriente) {
    return async (dispatch) => {
        dispatch(descargarMenus());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/menu?from=${indexPrimerUsuario}&limit=${limit}`, header)
                .then(response => {
                    response.data.paginaCorriente = paginaCorriente;
                    dispatch(descargarMenusExito(response.data));
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
export function crearNuevoMenuAction(datosNuevoMenu, imageFile) {
    return async (dispatch) => {
        dispatch(agregarMenu());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);

            const formData = new FormData();
            formData.append('file', imageFile.img);

            await clienteAxios.post('/api/menu', datosNuevoMenu, header)
                .then(response => {
                    if (!response.data.menuStored) {
                        const { menu } = response.data;

                        clienteAxios.put(`/api/upload/menus/${menu._id}`, formData, header)

                        dispatch(agregarMenuExito(menu));
                    } else {
                        const { menuStored } = response.data;   // menus con status=false a status=true

                        clienteAxios.put(`/api/upload/menus/${menuStored._id}`, formData, header)

                        dispatch(agregarMenuExito(menuStored));
                        console.log(response.data.msg);
                    }
                })
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
            const formData = new FormData();
            formData.append('file', imageFile.img);
            await clienteAxios.put(`/api/upload//menu-categories/${datos_categoria._id}`, formData, header)
                .then((response) => {
                    clienteAxios.put(`/api/menu-categories/${response.data.category._id}`, datos_categoria, header);
                    dispatch(editarCategoriaExito(response.data.category));
                })
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
export function obtenerCategoriasAction(indexPrimerUsuario, limit, paginaCorriente) {
    return async (dispatch) => {
        dispatch(descargarCategorias());

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            const respuesta = await clienteAxios.get(`/api/menu-categories?from=${indexPrimerUsuario}&limit=${limit}`, header);
            respuesta.data.paginaCorriente = paginaCorriente;
            dispatch(descargarCategoriasExito(respuesta.data));
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

            const formData = new FormData();
            formData.append('file', imageFile.img);
            await clienteAxios.post('/api/menu-categories', datosNuevaCategoria, header)
                .then((response) => {
                    if (!response.data.menuCategoryStored) {
                        const { category } = response.data;
                        clienteAxios.put(`/api/upload/menu-categories/${category._id}`, formData, header)
                        dispatch(agregarCategoriaExito(category));
                    } else {
                        const { menuCategoryStored } = response.data;   // menus con status=false a status=true
                        clienteAxios.put(`/api/upload/menu-categories/${menuCategoryStored._id}`, formData, header)
                        dispatch(agregarMenuExito(menuCategoryStored));
                    }
                })
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

/**********************  para buscar un usuario de la BBDD ********************************/
export function obtenerUsuariosBuscadorAction(palabraBusqueda) {
    return async (dispatch) => {
        dispatch(descargarUsuarios());
        console.log(palabraBusqueda.busqueda);

        try {
            const token = localStorage.getItem('token');
            const header = authorizationHeader(token);
            await clienteAxios.get(`/api/users/search/${String(palabraBusqueda.busqueda)}`, header)
                .then(response => {
                    /*  const { users } = response.data; */
                    console.log(response.data);
                    dispatch(descargarUsuariosExito(response.data));
                })
        } catch (error) {
            console.log(error);
            dispatch(descargarUsuariosError('Error al buscar los usuarios'));
        }
    }
}

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
export function obtenerUsuariosAction(indexPrimerUsuario, limit, paginaCorriente) {
    return async (dispatch) => {
        dispatch(descargarUsuarios());
        try {
            const token = localStorage.getItem('token');
            const header = {
                headers: {
                    'Authorization': `${token}`
                }
            }
            const respuesta = await clienteAxios.get(`/api/users?from=${indexPrimerUsuario}&limit=${limit}`, header);
            respuesta.data.paginaCorriente = paginaCorriente;
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