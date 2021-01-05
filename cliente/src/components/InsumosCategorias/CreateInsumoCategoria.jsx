import React, { Fragment, useState } from 'react';
import './InsumosCategorias.css';

import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarCategoriaInsumoAction,
    crearNuevaCategoriaInsumoAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const CreateInsumoCategoria = () => {

    const [insumoCategoria, setInsumoCategoria] = useState({
        description: '',
        parent: undefined,
        img: undefined,
    });


    const { description, parent, img } = insumoCategoria;

    const handleChange = e => {
        setInsumoCategoria({
            ...insumoCategoria,
            [e.target.name]: e.target.value
        });
    }

    const dispatch = useDispatch();

    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarCategoriaInsumoAction(nuevo_estado));
    const agregar_nuevo_Categoria_action = (datosNuevoCategoriaInsumo) => dispatch(crearNuevaCategoriaInsumoAction(datosNuevoCategoriaInsumo));

    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_categoria_insumo);
    const errores = useSelector(state => state.admin.errores);
    const msj_error = useSelector(state => state.admin.mensaje);

    const cerrar_modal = () => {
        console.log(cerrar_modal_state_store);
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    const handleSubmitAgregarCategoriaInsumo = e => {
        e.preventDefault();

        agregar_nuevo_Categoria_action({ description, parent, img });
        console.log(errores);
        console.log(msj_error);
        if (errores === [] && msj_error === null) {
            console.log("entra");
            cerrar_modal();
        }

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

                        {msj_error ? <p className="error">{msj_error}</p> : null}

                        {errores[0] ?
                            <div>
                                <p className="error">{errores[0].description.message}</p>
                            </div>
                            : null}

                        <form onSubmit={handleSubmitAgregarCategoriaInsumo}>
                            <div className="form-row">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Categoria"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Imagen</label>
                                <input
                                    type="file"
                                    name="img"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Categoria Padre</label>
                                <select
                                    className="form-control"
                                    name="parent"
                                    value={parent}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Seleccione una categoria --</option>
                                </select>
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

export default CreateInsumoCategoria
