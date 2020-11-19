import React, { Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Usuario from '../Usuario/Usuario';
import './Admin.css';

// REDUX
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {
    usuarioAction,
} from '../../actions/adminActions';

const Admin = () => {

    /*USAR USE SELECTOR*/
    const en_usuario_state_store = useSelector(state => state.admin.en_usuario);
    console.log(en_usuario_state_store);

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
                    {en_usuario_state_store ? <Usuario /> : <h1>Admin</h1>}
                </div>
            </div>
        </Fragment>
    );
}

export default Admin;