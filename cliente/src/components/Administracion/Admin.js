import React, { Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Usuario from '../Usuario/Usuario';
import './Admin.css';
import { validarRol } from "../../helpers/helpers";
import { Redirect } from 'react-router';

// REDUX
import { useSelector } from 'react-redux';

const Admin = () => {
    /*USAR USE SELECTOR*/
    const en_usuario_state_store = useSelector(state => state.admin.en_usuario);

    const [isValid, setIsValid] = React.useState('loading');
    React.useEffect(() => {
        const validateLogin = async () => {
            const is_valid = await validarRol('ADMIN_ROLE');
            setIsValid(is_valid);
        };
        validateLogin();
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
                    {en_usuario_state_store ? <Usuario /> : <h1>Admin</h1>}
                </div>
            </div>
        </Fragment>
    );
}

export default Admin;