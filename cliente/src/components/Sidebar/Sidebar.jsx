import React, { useState } from 'react';
import './Sidebar.css';

import { useDispatch, useSelector } from 'react-redux';
import {
    usuarioAction,
    pantallaMenuAction,
    pantallaCategoriaAction,
    pantallaInsumosAction,
} from '../../actions/adminActions';

const Sidebar = () => {

    const [enUsuarios, setEnUsuarios] = useState(false);

    const dispatch = useDispatch();

    // ENVIAR ESTADOS AL ACTION -> ADMINACTION.
    const entrar_usuarios_crud = estadoNuevo => dispatch(usuarioAction(estadoNuevo));
    const entrar_menu_crud = estadoMenu => dispatch(pantallaMenuAction(estadoMenu));
    const entrar_categoria_crud = estadoCategoria => dispatch(pantallaCategoriaAction(estadoCategoria));
    const entrar_insumos_crud = estadoInsumos => dispatch(pantallaInsumosAction(estadoInsumos));
    // OBTENEMOS DATOS DESDE STORE
    const entrar_categoria_store = useSelector(state => state.admin.en_categoria);
    const entrar_menu_store = useSelector(state => state.admin.en_menu);
    const entrar_insumos_store = useSelector(state => state.admin.en_insumos);

    // metodo que corrobora si mostrar CRUD de usuarios.
    const entra_usuarios = e => {
        e.preventDefault();

        if (enUsuarios) {
            entrar_usuarios_crud(setEnUsuarios(false));
        } else {
            entrar_usuarios_crud(setEnUsuarios(true));
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

    // metodo que corrobora si mostrar CRUD de insumos.
    const entra_insumos = e => {
        e.preventDefault();

        if (entrar_insumos_store) {
            entrar_insumos_crud(false);
        } else {
            entrar_insumos_crud(true);
        }
    }

    return (
        <div id="sidebar">
            <ul>
                <li onClick={entra_usuarios}>Usuarios</li>
                <li onClick={entra_categoria}>Categoria</li>
                <li onClick={entra_menu}>Menu</li>
                <li onClick={entra_insumos}>Insumos</li>
            </ul>
        </div>
    );
}

export default Sidebar;