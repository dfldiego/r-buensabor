import React, { useState } from 'react';
import './Sidebar.css';

import { useDispatch } from 'react-redux';
import {
    usuarioAction,
} from '../../actions/adminActions';

const Sidebar = () => {

    const [enUsuarios, setEnUsuarios] = useState(false);

    const dispatch = useDispatch();

    // ENVIAR ESTADOS AL ACTION -> ADMINACTION.
    const entrar_usuarios_crud = estadoNuevo => dispatch(usuarioAction(estadoNuevo));

    // metodo que corrobora si mostrar CRUD de usuarios.
    const entra_usuarios = e => {
        e.preventDefault();

        if (enUsuarios) {
            entrar_usuarios_crud(setEnUsuarios(false));
        } else {
            entrar_usuarios_crud(setEnUsuarios(true));
        }
    }

    return (
        <div id="sidebar">
            <ul>
                <li onClick={entra_usuarios}>Usuarios</li>
                <li>Otros</li>
            </ul>
        </div>
    );
}

export default Sidebar;