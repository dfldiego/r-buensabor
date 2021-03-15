import React, { Fragment } from 'react';
import '../../assets/css/styles.css';
import './Header.css'
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//importamos componentes
import Navbar from '../Navbar/Navbar';

// Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions de Redux
import {
    abrirCerrarModalAction,
} from '../../actions/homeActions';


const Header = () => {

    // redireccionar a la pagina principal una vez que editamos el producto
    const history = useHistory();

    const dispatch = useDispatch();

    // USE SELECTOR
    const esta_logueado_state_store = useSelector(state => state.home.esta_logueado);

    // manda llamar el action de homeActions
    const abrir_cerrar_Modal = (estado_modal) => dispatch(abrirCerrarModalAction(estado_modal));

    const handleClick_abrir_catalogo = async (e) => {
        if (esta_logueado_state_store) {
            history.push('/catalogo');
            return;
        }
        await Swal.fire({
            icon: 'error',
            title: 'No estás logueado',
            text: 'Por favor, inicia Sesion para poder ver el catalogo',
        });
        abrir_cerrar_Modal(true);
    }

    return (
        <Fragment>
            <header className="header inicio">
                <div className="contenedor">
                    <Navbar />

                    <div className="header__row">
                        <div className="header_col_2">
                            <h1 className="header__h1">¡Volá con tu delivery online!</h1>
                            <Link
                                to={"#"}
                                className="header__btn"
                                onClick={e => handleClick_abrir_catalogo()}
                            >Explorar Ahora &#8594;</Link>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header
