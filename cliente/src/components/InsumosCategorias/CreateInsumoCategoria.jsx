import React, { Fragment, useState, useEffect } from 'react';
import './InsumosCategorias.css';

import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarCategoriaInsumoAction,
    crearNuevaCategoriaInsumoAction,
    obtenerCategoriaInsumoAction,
    editarCategoriaInsumoAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const CreateInsumoCategoria = () => {

    const [imageFile, setimageFile] = useState({});

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
    const agregar_nuevo_Categoria_action = (datosNuevoCategoriaInsumo, imageFile) => dispatch(crearNuevaCategoriaInsumoAction(datosNuevoCategoriaInsumo, imageFile));
    const cargarCategoriaInsumo = () => dispatch(obtenerCategoriaInsumoAction());
    const categoria_insumo_editar_action = (datos_categoria_insumos, imageFile) => dispatch(editarCategoriaInsumoAction(datos_categoria_insumos, imageFile));

    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_categoria_insumo);
    const errores = useSelector(state => state.admin.errores);
    const msj_error = useSelector(state => state.admin.mensaje);
    const categorias_insumo = useSelector(state => state.admin.categorias_insumo);
    const categoria_insumo_editar = useSelector(state => state.admin.categoria_insumo_editar);

    const cerrar_modal = () => {
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    useEffect(() => {
        cargarCategoriaInsumo();

        // eslint-disable-next-line
    }, []);

    const handleSubmitAgregarCategoriaInsumo = e => {
        e.preventDefault();

        if (categoria_insumo_editar) {
            insumoCategoria._id = categoria_insumo_editar._id;
            categoria_insumo_editar_action(insumoCategoria, imageFile);
            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        } else {
            agregar_nuevo_Categoria_action({ description, parent, img }, imageFile);

            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        }

    }

    useEffect(() => {
        if (categoria_insumo_editar) {
            setInsumoCategoria({
                ...insumoCategoria,
                description: categoria_insumo_editar.description,
                parent: categoria_insumo_editar.parent,
                img: categoria_insumo_editar.img,
            })
        }

        // eslint-disable-next-line
    }, [categoria_insumo_editar])

    var handleChange_imagen = (e) => {
        setimageFile({
            ...imageFile,
            [e.target.name]: e.target.files[0],
        });
    };

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
                                    onChange={handleChange_imagen}
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
                                    {
                                        categoria_insumo_editar ?
                                            <option
                                                key={categoria_insumo_editar._id}
                                                value={categoria_insumo_editar._id}
                                            >{categoria_insumo_editar.parent.description}</option>
                                            :
                                            <option value="">-- Seleccione una categoria --</option>
                                    }
                                    {
                                        categorias_insumo.map(categoria => (
                                            <option
                                                key={categoria._id}
                                                value={categoria._id}
                                            >{categoria.description}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {
                                categoria_insumo_editar ?
                                    <button
                                        type="submit"
                                    >Editar</button>
                                    :
                                    <button
                                        type="submit"
                                    >Agregar</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateInsumoCategoria
