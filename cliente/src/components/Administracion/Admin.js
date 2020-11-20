import React, { Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Usuario from '../Usuario/Usuario';
import './Admin.css';

// REDUX
import { useSelector } from 'react-redux';

const Admin = () => {

    /*USAR USE SELECTOR*/
    const en_usuario_state_store = useSelector(state => state.admin.en_usuario);

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