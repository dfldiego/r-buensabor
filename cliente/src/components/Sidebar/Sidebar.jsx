import React, { Fragment } from 'react';
import './Sidebar.css';

const Sidebar = () => {

    const agregarEstilo = e => {

    }

    return (
        <Fragment>
            <div id="sidebar" onClick={agregarEstilo}>
                <ul>
                    <li>Usuarios</li>
                    <li>Otros</li>
                </ul>
            </div>
        </Fragment>
    );
}

export default Sidebar;