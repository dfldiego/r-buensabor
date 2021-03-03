import React from 'react';
import './Sidebar.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    usuarioAction,
    pantallaMenuAction,
    pantallaCategoriaAction,
    pantallaInsumosAction,
    pantallaCategoriaInsumoAction,
    pantallaPedidosAction,
    pantallaConfiguracionAction,
    pantallaReportesAction,
} from '../../actions/adminActions';

const Sidebar = () => {

    const rolUser = JSON.parse(localStorage.getItem('user')).role;
    const dispatch = useDispatch();

    // ENVIAR ESTADOS AL ACTION -> ADMINACTION.
    const entrar_usuarios_crud = estadoNuevo => dispatch(usuarioAction(estadoNuevo));
    const entrar_menu_crud = estadoMenu => dispatch(pantallaMenuAction(estadoMenu));
    const entrar_categoria_crud = estadoCategoria => dispatch(pantallaCategoriaAction(estadoCategoria));
    const entrar_insumos_crud = estadoInsumos => dispatch(pantallaInsumosAction(estadoInsumos));
    const entrar_categoria_insumos_crud = estadoCategoriaInsumo => dispatch(pantallaCategoriaInsumoAction(estadoCategoriaInsumo));
    const entrar_pedidos_crud = estadoPedidos => dispatch(pantallaPedidosAction(estadoPedidos));
    const entrar_configuracion_crud = estadoConfiguracion => dispatch(pantallaConfiguracionAction(estadoConfiguracion));
    const entrar_reportes = estadoReportes => dispatch(pantallaReportesAction(estadoReportes));

    // OBTENEMOS DATOS DESDE STORE
    const entrar_usuario_store = useSelector(state => state.admin.en_usuario);
    const entrar_categoria_store = useSelector(state => state.admin.en_categoria);
    const entrar_menu_store = useSelector(state => state.admin.en_menu);
    const entrar_insumos_store = useSelector(state => state.admin.en_insumos);
    const entrar_categoria_insumos_store = useSelector(state => state.admin.en_categoria_insumos);
    const entrar_pedidos_store = useSelector(state => state.admin.en_pedidos);
    const entrar_configuracion_store = useSelector(state => state.admin.en_configuracion);
    const entrar_reportes_store = useSelector(state => state.admin.en_reportes);

    // metodo que corrobora si mostrar CRUD de usuarios.
    const entra_usuarios = e => {
        e.preventDefault();

        if (entrar_usuario_store) {
            entrar_usuarios_crud(false);
        } else {
            entrar_usuarios_crud(true);
        }
    }

    // metodo que corrobora si mostrar CRUD de categorias.
    const entra_categoria = e => {
        e.preventDefault();

        if (entrar_categoria_store) {
            entrar_categoria_crud(false);
        } else {
            entrar_categoria_crud(true);
        }
    }

    // metodo que corrobora si mostrar CRUD de menus.
    const entra_menu = e => {
        e.preventDefault();

        if (entrar_menu_store) {
            entrar_menu_crud(false);
        } else {
            entrar_menu_crud(true);
        }
    }

    // metodo que corrobora si mostrar CRUD de categoria insumos.
    const entra_categoria_insumos = e => {
        e.preventDefault();

        if (entrar_categoria_insumos_store) {
            entrar_categoria_insumos_crud(false);
        } else {
            entrar_categoria_insumos_crud(true);
        }
    }

    // metodo que corrobora si mostrar CRUD de insumos.
    const entra_insumos = e => {
        e.preventDefault();

        if (entrar_insumos_store) {
            entrar_insumos_crud(false);
        } else {
            entrar_insumos_crud(true);
        }
    }

    // metodo que corrobora si mostrar CRUD de pedidos.
    const entra_pedidos = e => {
        e.preventDefault();

        if (entrar_pedidos_store) {
            entrar_pedidos_crud(false);
        } else {
            entrar_pedidos_crud(true);
        }
    }

    // metodo que corrobora si mostrar CRUD de configuracion.
    const entra_configuracion = e => {
        e.preventDefault();

        if (entrar_configuracion_store) {
            entrar_configuracion_crud(false);
        } else {
            entrar_configuracion_crud(true);
        }
    }

    // metodo que corrobora si mostrar REPORTES.
    const entra_reportes = e => {
        e.preventDefault();

        if (entrar_reportes_store) {
            entrar_reportes(false);
        } else {
            entrar_reportes(true);
        }
    }

    return (
        <div id="sidebar">
            <ul>
                {
                    rolUser === 'ADMIN_ROLE' || rolUser === 'SUPER_ADMIN_ROLE' ?
                        <span>
                            <li onClick={entra_usuarios}>Usuarios</li>
                            <li onClick={entra_categoria}>Categoria</li>
                            <li onClick={entra_menu}>Menu</li>
                            <li onClick={entra_categoria_insumos}>Categoria Insumo</li>
                            <li onClick={entra_insumos}>Insumos</li>
                            <li onClick={entra_pedidos}>Pedidos</li>
                            <li onClick={entra_configuracion}>Configuración</li>
                            <li onClick={entra_reportes}>Reportes</li>
                        </span>
                        : null
                }
                {
                    rolUser === 'CHEF_ROLE' ?
                        <span>
                            <li onClick={entra_menu}>Menu</li>
                            <li onClick={entra_pedidos}>Pedidos</li>
                        </span>
                        : null
                }
                {
                    rolUser === 'CASHIER_ROLE' ?
                        <li onClick={entra_pedidos}>Pedidos</li>
                        : null
                }
            </ul>
        </div>
    );
}

export default Sidebar;