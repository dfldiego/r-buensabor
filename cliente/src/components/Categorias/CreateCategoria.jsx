import React, { Fragment, useEffect, useState } from 'react';
import './Categorias.css';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarCategoriaAction,
    crearNuevaCategoriaAction,
    editarCategoriaAction,
    obtenerCategoriasAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const CreateCategoria = () => {

    const [imageFile, setimageFile] = useState(null);

    const [categoria, setCategoria] = useState({ name: '' });
    const { name } = categoria;

    const handleChange = e => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    const dispatch = useDispatch();

    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarCategoriaAction(nuevo_estado));
    const agregar_categoria_action = (datosNuevaCategoria, imageFile) => dispatch(crearNuevaCategoriaAction(datosNuevaCategoria, imageFile));
    const categoria_editar_action = (datoscategoria, imageFile) => dispatch(editarCategoriaAction(datoscategoria, imageFile));
    const cargarcategorias = (indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerCategoriasAction(indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda));

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_categoria);
    const errores = useSelector(state => state.admin.errores);
    const msj_error = useSelector(state => state.admin.mensaje);
    const categoria_editar_store = useSelector(state => state.admin.categoria_editar);
    const limite_state = useSelector(state => state.admin.limite);
    let paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);
    let palabraBuscar_state = useSelector(state => state.admin.palabraBuscar);

    var handleChange_imagen = (e) => {
        setimageFile({
            ...imageFile,
            [e.target.name]: e.target.files[0],
        });
    };

    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    useEffect(() => {
        cargarcategorias();

        // eslint-disable-next-line
    }, []);

    /*****************METODO SUBMIT ******************/
    const handleSubmitAgregarCategoria = e => {
        e.preventDefault();

        // si apretamos boton editar
        if (categoria_editar_store) {
            // le pasamos al categoriaEditado el id del categoria original
            categoria._id = categoria_editar_store._id;
            // pasamos los datos del categoria editado al action
            categoria_editar_action(categoria, imageFile);

            cargarcategorias(0, limite_state, paginaCorriente_state, palabraBuscar_state);

            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        } else {
            agregar_categoria_action({ name }, imageFile);
            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        }
    }

    // campos cargados
    useEffect(() => {
        if (categoria_editar_store) {
            setCategoria({
                ...categoria,
                name: categoria_editar_store.name,
            })
        }
        // eslint-disable-next-line
    }, [categoria_editar_store])


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
                            : null
                        }

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
                            <div className="form-row">
                                <label>Imagen</label>
                                <input
                                    type="file"
                                    name="img"
                                    onChange={handleChange_imagen}
                                />
                            </div>
                            {
                                categoria_editar_store ?
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

export default CreateCategoria
