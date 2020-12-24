import React, { Fragment, useState } from 'react';
import './Categorias.css';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarCategoriaAction,
    crearNuevaCategoriaAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const CreateCategoria = () => {

    const [categoria, setCategoria] = useState({ name: '' });
    const { name } = categoria;

    const handleChange = e => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const dispatch = useDispatch();
    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarCategoriaAction(nuevo_estado));
    const agregar_categoria_action = (datosNuevaCategoria) => dispatch(crearNuevaCategoriaAction(datosNuevaCategoria));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_categoria);
    let error_store = useSelector(state => state.admin.mensaje);

    /***********METODO QUE CIERRA MODAL: modifico el state *************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    /*****************METODO SUBMIT ******************/
    const handleSubmitAgregarCategoria = e => {
        e.preventDefault();

        // validar campos vacios
        if (name === '') {
            agregar_categoria_action({ name });
            return;
        }

        agregar_categoria_action({ name });
        setCategoria({ name: '' });
    }

    return (
        <Fragment>
            <div className="modal-categoria">
                <div className="modal-container-categoria">
                    <div className="form-container-categoria">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />
                        {error_store ? <p className="error">{error_store}</p> : null}
                        <form onSubmit={handleSubmitAgregarCategoria}>
                            <div className="form-row">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Categoria"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                            >Agregar</button>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default CreateCategoria
