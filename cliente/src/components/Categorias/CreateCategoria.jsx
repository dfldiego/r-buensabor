import React, { Fragment, useEffect, useState } from 'react';
import './Categorias.css';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarCategoriaAction,
    crearNuevaCategoriaAction,
    editarCategoriaAction,
    obtenerCategoriaAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const CreateCategoria = () => {

    const [imageFile, setimageFile] = useState({});

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
    const agregar_categoria_action = (datosNuevaCategoria, imageFile) => dispatch(crearNuevaCategoriaAction(datosNuevaCategoria, imageFile));
    const categoria_editar_action = (datoscategoria) => dispatch(editarCategoriaAction(datoscategoria));
    const cargarcategorias = () => dispatch(obtenerCategoriaAction());

    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_categoria);
    let error_store = useSelector(state => state.admin.mensaje);
    let categoria_editar_store = useSelector(state => state.admin.categoria_editar);

    /***********METODO QUE CIERRA MODAL: modifico el state *************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    var handleChange_imagen = (e) => {
        /* setPerfil({
            ...perfil,
            [e.target.name]: e.target.files[0].name,
        }); */
        setimageFile({
            ...imageFile,
            [e.target.name]: e.target.files[0],
        });
    };

    /*****************METODO SUBMIT ******************/
    const handleSubmitAgregarCategoria = e => {
        e.preventDefault();

        // validar campos vacios
        if (name === '') {
            agregar_categoria_action({ name });
            return;
        }

        // si apretamos boton editar
        if (categoria_editar_store) {
            // le pasamos al categoriaEditado el id del categoria original
            categoria._id = categoria_editar_store._id;
            // pasamos los datos del categoria editado al action
            categoria_editar_action(categoria);
            //cargamos los categorias en la tabla
            cargarcategorias();
            //finalmente, cerramos modal
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        } else {
            agregar_categoria_action({ name }, imageFile);
            setCategoria({ name: '' });
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
