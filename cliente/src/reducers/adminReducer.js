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
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
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
    AGREGAR_CATEGORIA_INSUMO_ERROR,
    AGREGAR_CATEGORIA_INSUMO_ERRORES,
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

const initialState = {
    en_usuario: null,
    en_menu: null,
    en_categoria: null,
    en_insumos: null,
    en_categoria_insumos: null,
    loading: false,
    abrir_agregar_usuario: false,
    abrir_agregar_categoria: false,
    abrir_agregar_menu: false,
    abrir_agregar_categoria_insumo: false,
    abrir_agregar_insumo: false,
    usuarios: [],
    categorias: [],
    menus: [],
    categorias_insumo: [],
    insumos: [],
    error: null,
    errores: [],
    mensaje: null,
    usuario_eliminar: null,
    categoria_eliminar: null,
    menu_eliminar: null,
    categoria_insumo_eliminar: null,
    insumo_eliminar: null,
    usuario_editar: null,
    categoria_editar: null,
    menu_editar: null,
    categoria_insumo_editar: null,
    insumo_editar: null,
    mostrarUsuarios: false,
    mostrarCategorias: false,
    mostrarMenus: false,
    mostrarCategoriasInsumo: false,
    mostrarInsumo: false,
    palabraBuscar: null,
    totalElementos: 0,
    paginaCorriente: 0,
    desde: 0,
    limite: 5,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ENTRAR_CRUD_USUARIOS:
            return {
                ...state,
                en_usuario: true,
                en_menu: null,
                en_categoria: null,
                en_insumos: null,
                en_categoria_insumos: null,
            }
        case ENTRAR_CRUD_MENU:
            return {
                ...state,
                en_usuario: null,
                en_menu: true,
                en_categoria: null,
                en_insumos: null,
                en_categoria_insumos: null,
            }
        case ENTRAR_CRUD_CATEGORIA:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: true,
                en_insumos: null,
                en_categoria_insumos: null,
            }
        case ENTRAR_CRUD_INSUMOS:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: null,
                en_insumos: true,
                en_categoria_insumos: null,
            }
        case ENTRAR_CRUD_CATEGORIA_INSUMOS:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: null,
                en_insumos: null,
                en_categoria_insumos: true,
            }
        case CERRAR_AGREGAR_USUARIOS:
            return {
                ...state,
                abrir_agregar_usuario: action.payload,
                mensaje: null,
                error: null,
                usuario_eliminar: null,
                usuario_editar: null,
            }
        case ABRIR_AGREGAR_USUARIOS:
            return {
                ...state,
                abrir_agregar_usuario: action.payload,
                mensaje: null,
                error: null,
            }
        case COMENZAR_DESCARGA_USUARIOS:
        case COMENZAR_DESCARGA_CATEGORIA:
        case COMENZAR_DESCARGA_MENU:
        case COMENZAR_DESCARGA_CATEGORIA_INSUMO:
        case COMENZAR_DESCARGA_INSUMO:
            return {
                ...state,
                loading: action.payload,
            }
        case AGREGAR_USUARIO:
        case AGREGAR_CATEGORIA:
        case AGREGAR_MENU:
        case AGREGAR_CATEGORIA_INSUMO:
        case AGREGAR_INSUMO:
            return {
                ...state,
                loading: action.payload,
            }
        case AGREGAR_USUARIO_EXITO:
        case REGISTRO_EXITOSO:
            return {
                ...state,
                loading: false,
                usuarios: [...state.usuarios, action.payload],
                mensaje: null,
                error: false,
                abrir_agregar_usuario: null,
            }
        case AGREGAR_CATEGORIA_EXITO:
            return {
                ...state,
                loading: false,
                categorias: [...state.categorias, action.payload],
                abrir_agregar_categoria: null,
            }
        case AGREGAR_USUARIO_ERROR:
        case AGREGAR_CATEGORIA_ERROR:
        case DESCARGA_USUARIOS_ERROR:
        case DESCARGA_CATEGORIA_ERROR:
        case USUARIO_ELIMINADO_ERROR:
        case USUARIO_EDITADO_ERROR:
        case REGISTRO_ERROR:
        case CATEGORIA_ELIMINADO_ERROR:
        case CATEGORIA_EDITADO_ERROR:
        case DESCARGA_MENU_ERROR:
        case AGREGAR_MENU_ERROR:
        case MENU_ELIMINADO_ERROR:
        case MENU_EDITADO_ERROR:
        case AGREGAR_CATEGORIA_INSUMO_ERROR:
        case DESCARGA_CATEGORIA_INSUMO_ERROR:
        case CATEGORIA_INSUMO_ELIMINADO_ERROR:
        case CATEGORIA_INSUMO_EDITADO_ERROR:
        case AGREGAR_INSUMO_ERROR:
        case DESCARGA_INSUMO_ERROR:
        case INSUMO_ELIMINADO_ERROR:
        case INSUMO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                mensaje: action.payload,
                usuario_eliminar: null,
                categoria_eliminar: null,
                menu_eliminar: null,
                categoria_insumo_eliminar: null,
                insumo_eliminar: null,
                errores: [],
            }
        case DESCARGA_USUARIOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                errores: [],
                usuarios: action.payload.users,
                mostrarUsuarios: true,
                totalElementos: action.payload.total,
                limite: action.payload.limit,
                palabraBuscar: action.payload.datosPaginacion.busqueda,
                desde: Number(action.payload.datosPaginacion.indexPrimerUsuario),
                paginaCorriente: action.payload.datosPaginacion.pagina
            }
        case DESCARGA_CATEGORIA_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                errores: [],
                categorias: action.payload.menuCategories,
                mostrarCategorias: true,
                totalElementos: action.payload.total,
                limite: action.payload.limit,
                palabraBuscar: action.payload.datosPaginacion.busqueda,
                desde: Number(action.payload.datosPaginacion.indexPrimerUsuario),
                paginaCorriente: action.payload.datosPaginacion.pagina
            }
        case OBTENER_USUARIO_ELIMINAR:
            return {
                ...state,
                usuario_eliminar: action.payload
            }
        case OBTENER_USUARIO_EDITAR:
            return {
                ...state,
                usuario_editar: action.payload,
            }
        case USUARIO_ELIMINADO_EXITO:
            return {
                ...state,
                usuario_eliminar: null,
                usuarios: state.usuarios.map(usuario =>
                    usuario._id === action.payload._id ?
                        usuario = action.payload
                        :
                        usuario
                )
            }
        case USUARIO_EDITADO_EXITO:
            return {
                ...state,
                usuarios: state.usuarios.map(usuario =>
                    usuario._id === action.payload._id ?
                        usuario = action.payload
                        :
                        usuario
                ),
                usuario_editar: null,
            }
        case ABRIR_AGREGAR_CATEGORIA:
        case CERRAR_AGREGAR_CATEGORIA:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                abrir_agregar_categoria: action.payload,
                categoria_editar: null,
            }
        case OBTENER_CATEGORIA_ELIMINAR:
            return {
                ...state,
                categoria_eliminar: action.payload
            }
        case CATEGORIA_ELIMINADO_EXITO:
            return {
                ...state,
                categoria_eliminar: null,
                categorias: state.categorias.map(categoria =>
                    categoria._id === action.payload._id ?
                        categoria = action.payload
                        :
                        categoria
                )
            }
        case OBTENER_CATEGORIA_EDITAR:
            return {
                ...state,
                categoria_editar: action.payload,
            }
        case CATEGORIA_EDITADO_EXITO:
            return {
                ...state,
                categorias: state.categorias.map(categoria =>
                    categoria._id === action.payload._id ?
                        categoria = action.payload
                        :
                        categoria
                ),
                categoria_editar: null,
            }
        case ABRIR_AGREGAR_MENU:
        case CERRAR_AGREGAR_MENU:
            return {
                ...state,
                abrir_agregar_menu: action.payload,
                errores: [],
                mensaje: null,
                error: null,
                menu_editar: null,
            }
        case AGREGAR_MENU_EXITO:
            return {
                ...state,
                loading: false,
                menus: [...state.menus, action.payload],
                errores: [],
                abrir_agregar_menu: false,
                mensaje: null,
                error: null,
            }
        case AGREGAR_CATEGORIA_ERRORES:
        case AGREGAR_MENU_ERRORES:
        case MENU_EDITADO_ERRORES:
        case AGREGAR_CATEGORIA_INSUMO_ERRORES:
        case CATEGORIA_INSUMO_EDITADO_ERRORES:
        case AGREGAR_INSUMO_ERRORES:
        case INSUMO_EDITADO_ERRORES:
            return {
                ...state,
                errores: [action.payload],
                mensaje: null,
                error: null,
            }
        case DESCARGA_MENU_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                errores: [],
                menus: action.payload.menus,
                mostrarMenus: true,
                totalElementos: action.payload.total,
                limite: action.payload.limit,
                palabraBuscar: action.payload.datosPaginacion.busqueda,
                desde: Number(action.payload.datosPaginacion.indexPrimerUsuario),
                paginaCorriente: action.payload.datosPaginacion.pagina
            }
        case OBTENER_MENU_ELIMINAR:
            return {
                ...state,
                menu_eliminar: action.payload
            }
        case MENU_ELIMINADO_EXITO:
            return {
                ...state,
                menus: state.menus.filter(menu => menu._id !== state.menu_eliminar),
                menu_eliminar: null,
            }
        case OBTENER_MENU_EDITAR:
            return {
                ...state,
                menu_editar: action.payload,
            }
        case MENU_EDITADO_EXITO:
            return {
                ...state,
                menus: state.menus.map(menu =>
                    menu._id === action.payload._id ?
                        menu = action.payload
                        :
                        menu
                ),
                menu_editar: null,
                abrir_agregar_menu: false,
            }
        case ABRIR_AGREGAR_CATEGORIA_INSUMO:
        case CERRAR_AGREGAR_CATEGORIA_INSUMO:
            return {
                ...state,
                abrir_agregar_categoria_insumo: action.payload,
                errores: [],
                mensaje: null,
                error: null,
                categoria_insumo_editar: null,
            }
        case AGREGAR_CATEGORIA_INSUMO_EXITO:
            return {
                ...state,
                loading: false,
                errores: [],
                error: null,
                mensaje: null,
                abrir_agregar_categoria_insumo: false,
                categorias_insumo: [...state.categorias_insumo, action.payload],
            }
        case DESCARGA_CATEGORIA_INSUMO_EXITO:
            return {
                ...state,
                loading: false,
                mensaje: null,
                error: null,
                errores: [],
                categorias_insumo: action.payload.productCategories,
                mostrarCategoriasInsumo: true,
                totalElementos: action.payload.total,
                limite: action.payload.limit,
                paginaCorriente: action.payload.paginaCorriente,
            }
        case OBTENER_CATEGORIA_INSUMO_ELIMINAR:
            return {
                ...state,
                categoria_insumo_eliminar: action.payload
            }
        case CATEGORIA_INSUMO_ELIMINADO_EXITO:
            return {
                ...state,
                categorias_insumo: state.categorias_insumo.filter(categoria => categoria._id !== state.categoria_insumo_eliminar),
                categoria_insumo_eliminar: null,
            }
        case OBTENER_CATEGORIA_INSUMO_EDITAR:
            return {
                ...state,
                categoria_insumo_editar: action.payload,
            }
        case CATEGORIA_INSUMO_EDITADO_EXITO:
            return {
                ...state,
                categorias_insumo: state.categorias_insumo.map(categoria =>
                    categoria._id === action.payload._id ?
                        categoria = action.payload
                        :
                        categoria
                ),
                categoria_insumo_editar: null,
                abrir_agregar_categoria_insumo: false,
            }
        case ABRIR_AGREGAR_INSUMO:
        case CERRAR_AGREGAR_INSUMO:
            return {
                ...state,
                abrir_agregar_insumo: action.payload,
                errores: [],
                mensaje: null,
                error: null,
                insumo_editar: null,
            }
        case AGREGAR_INSUMO_EXITO:
            return {
                ...state,
                loading: false,
                errores: [],
                error: null,
                mensaje: null,
                abrir_agregar_insumo: false,
                insumos: [...state.insumos, action.payload],
            }
        case DESCARGA_INSUMO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                errores: [],
                mensaje: null,
                insumos: action.payload.products,
                mostrarInsumo: true,
                totalElementos: action.payload.total,
                limite: action.payload.limit,
                paginaCorriente: action.payload.paginaCorriente,
            }
        case OBTENER_INSUMO_ELIMINAR:
            return {
                ...state,
                insumo_eliminar: action.payload
            }
        case INSUMO_ELIMINADO_EXITO:
            return {
                ...state,
                insumos: state.insumos.filter(insumo => insumo._id !== state.insumo_eliminar),
                insumo_eliminar: null,
            }
        case OBTENER_INSUMO_EDITAR:
            return {
                ...state,
                insumo_editar: action.payload,
            }
        case INSUMO_EDITADO_EXITO:
            return {
                ...state,
                insumos: state.insumos.map(insumo =>
                    insumo._id === action.payload._id ?
                        insumo = action.payload
                        :
                        insumo
                ),
                insumo_editar: null,
                abrir_agregar_insumo: false,
            }
        default:
            return state;
    }
}