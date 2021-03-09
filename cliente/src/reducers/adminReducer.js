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
    ORDEN_EDITADO_EXITO,
    ORDEN_EDITADO_ERRORES,
    ORDEN_EDITADO_ERROR,
    ORDEN_EDITAR,
    DESCARGA_LISTADO_FACTURAS,
    DESCARGA_FACTURAS_ERROR,
    AGREGAR_ORDEN_DETALLE_PEDIDO,
    PRODUCTOS_ESCASOS_CARGADOS,
    ENTRAR_REPORTES,
    RANKING_EXCEL_EXPORTADO_EXITO,
    RANKING_EXCEL_EXPORTADO_ERROR,
} from '../types';

const initialState = {
    en_usuario: null,
    en_menu: null,
    en_categoria: null,
    en_insumos: null,
    en_categoria_insumos: null,
    en_pedidos: null,
    en_configuracion: null,
    en_reportes: null,
    loading: false,
    abrir_agregar_usuario: false,
    abrir_agregar_categoria: false,
    abrir_agregar_menu: false,
    abrir_agregar_categoria_insumo: false,
    abrir_agregar_insumo: false,
    abrir_modal_detalle_pedido: false,
    usuarios: [],
    listausuarios: [],
    categorias: [],
    categoriasSelect: [],
    menus: [],
    menu_detalles_pedido: [],
    menusSelect: [],
    categorias_insumo: [],
    categoriasInsumoSelect: [],
    pedidos: [],
    insumos: [],
    ingredientes_menu_detalle: [],
    facturas: [],
    error: null,
    errores: [],
    configuracion: null,
    mensaje: null,
    usuario_eliminar: null,
    categoria_eliminar: null,
    menu_eliminar: null,
    categoria_insumo_eliminar: null,
    insumo_eliminar: null,
    usuario_editar: null,
    categoria_editar: null,
    menu_editar: null,
    menu_detalle_editar: [],
    pedido_editar: null,
    categoria_insumo_editar: null,
    insumo_editar: null,
    insumo_detalles_pedido: [],
    configuracion_editar: null,
    mostrarUsuarios: false,
    mostrarCategorias: false,
    mostrarMenus: false,
    mostrarCategoriasInsumo: false,
    mostrarInsumo: false,
    mostrarPedidos: false,
    palabraBuscar: null,
    totalElementos: 0,
    paginaCorriente: 0,
    desde: 0,
    limite: 5,
    detalles_pedido: [],
    orden: null,
    productos_escasos: [],
    archivo: null,
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
                paginaCorriente: 0,
                palabraBuscar: null,
                en_pedidos: null,
                en_configuracion: null,
                en_reportes: null,
            }
        case ENTRAR_CRUD_MENU:
            return {
                ...state,
                en_usuario: null,
                en_menu: true,
                en_categoria: null,
                en_insumos: null,
                en_categoria_insumos: null,
                paginaCorriente: 0,
                palabraBuscar: null,
                en_pedidos: null,
                en_configuracion: null,
                en_reportes: null,
            }
        case ENTRAR_CRUD_CATEGORIA:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: true,
                en_insumos: null,
                en_categoria_insumos: null,
                paginaCorriente: 0,
                palabraBuscar: null,
                en_pedidos: null,
                en_configuracion: null,
                en_reportes: null,
            }
        case ENTRAR_CRUD_INSUMOS:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: null,
                en_insumos: true,
                en_categoria_insumos: null,
                paginaCorriente: 0,
                palabraBuscar: null,
                en_pedidos: null,
                en_configuracion: null,
                en_reportes: null,
            }
        case ENTRAR_CRUD_CATEGORIA_INSUMOS:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: null,
                en_insumos: null,
                en_categoria_insumos: true,
                paginaCorriente: 0,
                palabraBuscar: null,
                categoriasInsumoSelect: [],
                en_pedidos: null,
                en_configuracion: null,
                en_reportes: null,
            }
        case ENTRAR_CRUD_PEDIDOS:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: null,
                en_insumos: null,
                en_categoria_insumos: null,
                paginaCorriente: 0,
                palabraBuscar: null,
                en_pedidos: true,
                en_configuracion: null,
                en_reportes: null,
            }
        case ENTRAR_CRUD_CONFIGURACION:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: null,
                en_insumos: null,
                en_categoria_insumos: null,
                paginaCorriente: 0,
                palabraBuscar: null,
                en_pedidos: null,
                en_configuracion: true,
                en_reportes: null,
            }
        case ENTRAR_REPORTES:
            return {
                ...state,
                en_usuario: null,
                en_menu: null,
                en_categoria: null,
                en_insumos: null,
                en_categoria_insumos: null,
                paginaCorriente: 0,
                palabraBuscar: null,
                en_pedidos: null,
                en_configuracion: null,
                en_reportes: true,
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
        case COMENZAR_DESCARGA_PEDIDOS:
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
                abrir_agregar_usuario: false,
            }
        case AGREGAR_CATEGORIA_EXITO:
            return {
                ...state,
                loading: false,
                errores: [],
                error: null,
                mensaje: null,
                abrir_agregar_categoria: false,
                categorias: [...state.categorias, action.payload],
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
        case ORDEN_EDITADO_ERROR:
        case DESCARGA_PEDIDOS_ERROR:
        case DESCARGA_MENU_DETALLE_ERROR:
        case OBTENER_INSUMO_POR_ID_ERROR:
        case OBTENER_MENU_POR_ID_ERROR:
        case OBTENER_CONFIGURACION_ERROR:
        case CONFIGURACION_EDITADO_ERROR:
        case DESCARGA_FACTURAS_ERROR:
        case RANKING_EXCEL_EXPORTADO_ERROR:
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
        case DESCARGA_USER_ID:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                errores: [],
                listausuarios: action.payload.users,
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
                paginaCorriente: action.payload.datosPaginacion.pagina,
            }
        case DESCARGA_LISTADO_CATEGORIA:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                errores: [],
                categoriasSelect: action.payload.categories,
                mostrarCategorias: true,
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
                ),
                paginaCorriente: 0,
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
                ),
                paginaCorriente: 0,
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
                abrir_agregar_categoria: false,
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
                categoriasSelect: [],
                menu_detalle_editar: [],
                ingredientes_menu_detalle: [],
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
        case CATEGORIA_EDITADO_ERRORES:
        case ORDEN_EDITADO_ERRORES:
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
                paginaCorriente: 0,
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
                categoriasInsumoSelect: [],
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
                palabraBuscar: action.payload.datosPaginacion.busqueda,
                desde: Number(action.payload.datosPaginacion.indexPrimerUsuario),
                paginaCorriente: action.payload.datosPaginacion.pagina
            }
        case DESCARGA_LISTADO_CATEGORIA_INSUMO:
            return {
                ...state,
                loading: false,
                mensaje: null,
                error: null,
                errores: [],
                categoriasInsumoSelect: action.payload.productCategories,
                mostrarCategoriasInsumo: true,
                totalElementos: action.payload.total,
            }
        case DESCARGA_LISTADO_MENUS:
            return {
                ...state,
                loading: false,
                mensaje: null,
                error: null,
                errores: [],
                menusSelect: action.payload.menus,
                mostrarMenus: true,
                totalElementos: action.payload.total,
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
                paginaCorriente: 0,
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
                palabraBuscar: action.payload.datosPaginacion.busqueda,
                desde: Number(action.payload.datosPaginacion.indexPrimerUsuario),
                paginaCorriente: action.payload.datosPaginacion.pagina
            }
        case DESCARGA_LISTADO_INSUMOS:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                errores: [],
                insumos: action.payload.products,
            }
        case DESCARGA_LISTADO_MENU_DETALLE:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                errores: [],
                ingredientes_menu_detalle: action.payload,
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
                paginaCorriente: 0,
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
        case DESCARGA_PEDIDOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                errores: [],
                mensaje: null,
                pedidos: action.payload,
                mostrarPedidos: true,
            }
        case OBTENER_MENU_DETALLE_EDITAR:
            return {
                ...state,
                menu_detalle_editar: [...state.menu_detalle_editar, action.payload],
            }
        case ABRIR_MODAL_DETALLE_PEDIDO:
            return {
                ...state,
                abrir_modal_detalle_pedido: action.payload,
                errores: [],
                mensaje: null,
                error: null,
                insumo_detalles_pedido: [],
                menu_detalles_pedido: [],
            }
        case CERRAR_MODAL_DETALLE_PEDIDO:
            return {
                ...state,
                abrir_modal_detalle_pedido: action.payload,
                errores: [],
                mensaje: null,
                error: null,
                insumo_detalles_pedido: [],
                menu_detalles_pedido: [],
                orden: null,
                detalles_pedido: [],
            }
        case OBTENER_INSUMO_POR_ID:
            return {
                ...state,
                insumo_detalles_pedido: [...state.insumo_detalles_pedido, action.payload],
            }
        case OBTENER_MENU_POR_ID:
            return {
                ...state,
                menu_detalles_pedido: [...state.menu_detalles_pedido, action.payload],
            }
        case GUARDA_DETALLE_PEDIDO:
            return {
                ...state,
                detalles_pedido: action.payload,
            }
        case DESCARGA_LISTADO_CONFIGURACION:
            return {
                ...state,
                configuracion: action.payload,
            }
        case CONFIGURACION_EDITADO_EXITO:
            return {
                ...state,
                configuracion_editar: action.payload,
            }
        case ORDEN_EDITAR:
            return {
                ...state,
                pedido_editar: action.payload,
            }
        case ORDEN_EDITADO_EXITO:
            return {
                ...state,
                pedidos: state.pedidos.map(pedido =>
                    pedido._id === action.payload._id ?
                        pedido = action.payload
                        :
                        pedido
                ),
                pedido_editar: null,
            }
        case DESCARGA_LISTADO_FACTURAS:
            return {
                ...state,
                loading: false,
                error: null,
                mensaje: null,
                errores: [],
                facturas: action.payload,
            }
        case AGREGAR_ORDEN_DETALLE_PEDIDO:
            return {
                ...state,
                orden: action.payload,
            }
        case PRODUCTOS_ESCASOS_CARGADOS:
            return {
                ...state,
                productos_escasos: action.payload,
            }
        case RANKING_EXCEL_EXPORTADO_EXITO:
            return {
                ...state,
                archivo: action.payload,
            }

        default:
            return state;
    }
}