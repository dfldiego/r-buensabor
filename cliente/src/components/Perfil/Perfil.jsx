import React, { Fragment } from 'react';

// Estilos
import './Perfil.css';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    perfilAction,
} from '../../actions/homeActions';


const Perfil = () => {

    const dispatch = useDispatch();

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const perfil_callAction = estadoPerfil => dispatch(perfilAction(estadoPerfil));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let abrir_modal_perfil_store = useSelector(state => state.home.abrir_modal_perfil);

    /************** METODO PARA CERRAR MODAL *************************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (abrir_modal_perfil_store) {
            abrir_modal_perfil_store = false;
            perfil_callAction(abrir_modal_perfil_store);
        }
        return;
    }

    return (
        <Fragment>
            <div className="perfil">
                <div className="perfil_container">
                    <div className="form-container">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Perfil
