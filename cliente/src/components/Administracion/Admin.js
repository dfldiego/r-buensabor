import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Usuario from '../Usuario/Usuario';
import Menu from '../Menu/Menu';
import Categorias from '../Categorias/Categorias';
import Insumos from '../Insumos/Insumos';
import InsumosCategoria from '../InsumosCategorias/InsumosCategorias';
import Pedidos from '../Pedidos/Pedidos';
import Configuracion from '../Configuracion/Configuracion';
import Reportes from '../Reportes/Reportes';
import './Admin.css';
import { validarRol } from "../../helpers/helpers";
import { Redirect } from 'react-router';

// REDUX
import { useDispatch, useSelector } from 'react-redux';

import {
    estaLogueadoAction,
} from '../../actions/homeActions';

const Admin = () => {
    const dispatch = useDispatch();
    const estaLogueado_callAction = () => dispatch(estaLogueadoAction());
    /*USAR USE SELECTOR*/
    const en_usuario_state_store = useSelector(state => state.admin.en_usuario);
    const en_categoria_state_store = useSelector(state => state.admin.en_categoria);
    const en_menu_state_store = useSelector(state => state.admin.en_menu);
    const en_insumos_state_store = useSelector(state => state.admin.en_insumos);
    const entrar_categoria_insumos_store = useSelector(state => state.admin.en_categoria_insumos);
    const entrar_pedidos_store = useSelector(state => state.admin.en_pedidos);
    const entrar_configuracion_store = useSelector(state => state.admin.en_configuracion);
    const entrar_reportes_store = useSelector(state => state.admin.en_reportes);
    const estaLogueado_token = useSelector(state => state.home.token);
    const estaLogueado_estado = useSelector(state => state.home.esta_logueado);
    let rolUser = null;

    const [isValid, setIsValid] = useState('loading');
    if (localStorage.getItem('user')) {
        rolUser = JSON.parse(localStorage.getItem('user')).role;
    } else {
        /* res.Redirect('/'); */
        /* return <Redirect to={'/'} /> */
        estaLogueado_callAction();
    }

    useEffect(() => {
        estaLogueado_callAction();
        // eslint-disable-next-line
    }, [estaLogueado_token, estaLogueado_estado, en_usuario_state_store, en_categoria_state_store, en_menu_state_store, en_insumos_state_store, entrar_categoria_insumos_store, entrar_pedidos_store, entrar_configuracion_store, entrar_reportes_store]);

    useEffect(() => {
        const validateLogin = async (rolUser) => {
            if (rolUser === 'ADMIN_ROLE' || rolUser === 'CASHIER_ROLE' || rolUser === 'CHEF_ROLE' || rolUser === 'SUPER_ADMIN_ROLE') {
                const is_valid = await validarRol(rolUser);
                setIsValid(is_valid);
            }
        };
        validateLogin(rolUser);
    }, [setIsValid])

    if (isValid === 'loading') {
        return <p>Loading ...</p>
    }

    if (!isValid) {
        console.log('should redirect')
        return <Redirect to={'/'} />
    }

    return (
        <Fragment>
            <div className="fondo-negro">
                <Navbar />
            </div>
            <div className="dos-columnas-admin">
                <div>
                    <Sidebar />
                </div>
                <div>
                    {!en_usuario_state_store && !en_menu_state_store && !en_categoria_state_store && !entrar_categoria_insumos_store && !en_insumos_state_store && !entrar_pedidos_store && !entrar_configuracion_store && !entrar_reportes_store ? <h1>Página de Administración</h1> : null}
                    {en_usuario_state_store ? <Usuario /> : null}
                    {en_categoria_state_store ? <Categorias /> : null}
                    {en_menu_state_store ? <Menu /> : null}
                    {entrar_categoria_insumos_store ? <InsumosCategoria /> : null}
                    {en_insumos_state_store ? <Insumos /> : null}
                    {entrar_pedidos_store ? <Pedidos /> : null}
                    {entrar_configuracion_store ? <Configuracion /> : null}
                    {entrar_reportes_store ? <Reportes /> : null}
                </div>
            </div>
        </Fragment>
    );
}

export default Admin;