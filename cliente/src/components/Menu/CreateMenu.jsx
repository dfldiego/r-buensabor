import React, { Fragment, useEffect, useState } from 'react';
import './Menu.css';

import ClearIcon from '@material-ui/icons/Clear';

import { useDispatch, useSelector } from 'react-redux';
import {
    abrirCerrarAgregarMenuAction,
    obtenerCategoriasBuscadorAction,
    crearNuevoMenuAction,
    editarMenuAction,
} from '../../actions/adminActions';


const CreateMenu = () => {

    const [imageFile, setimageFile] = useState({});

    const [menu, setMenu] = useState({
        description: '',
        finished_time: undefined,
        price: undefined,
        category: undefined
    });


    const { description, finished_time, price, category } = menu;

    const handleChange = e => {
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
    }

    const dispatch = useDispatch();
    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarMenuAction(nuevo_estado));
    const obtenerCategorias_callAction = () => dispatch(obtenerCategoriasBuscadorAction());
    const agregar_nuevo_menu_action = (datosNuevoMenu, imageFile) => dispatch(crearNuevoMenuAction(datosNuevoMenu, imageFile));
    const menu_editar_action = (datosmenu, imageFile) => dispatch(editarMenuAction(datosmenu, imageFile));

    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_menu);
    const categorias = useSelector(state => state.admin.categorias);
    const errores = useSelector(state => state.admin.errores);
    const msj_error = useSelector(state => state.admin.mensaje);
    const menu_editar_store = useSelector(state => state.admin.menu_editar);

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
        obtenerCategorias_callAction();

        // eslint-disable-next-line
    }, []);

    const handleSubmitAgregarMenu = e => {
        e.preventDefault();

        if (menu_editar_store) {
            menu._id = menu_editar_store._id;
            menu_editar_action(menu, imageFile);

            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        } else {
            agregar_nuevo_menu_action({ description, finished_time, price, category }, imageFile)

            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        }

    }

    useEffect(() => {
        if (menu_editar_store) {
            setMenu({
                ...menu,
                description: menu_editar_store.description,
                finished_time: menu_editar_store.finished_time,
                price: menu_editar_store.price,
                category: menu_editar_store.category
            })
        }

        // eslint-disable-next-line
    }, [menu_editar_store])

    return (
        <Fragment>
            <div className="modal-menu">
                <div className="modal-container-menu">
                    <div className="form-container-menu">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />

                        {msj_error ? <p className="error">{msj_error}</p> : null}

                        {errores[0] ?
                            <div>
                                {
                                    errores[0].category ?
                                        <p className="error">{errores[0].category.message}</p>
                                        :
                                        null
                                }
                                {
                                    errores[0].description ?
                                        <p className="error">{errores[0].description.message}</p>
                                        :
                                        null
                                }
                                {
                                    errores[0].finished_time ?
                                        <p className="error">{errores[0].finished_time.message}</p>
                                        :
                                        null
                                }
                                {
                                    errores[0].price ?
                                        <p className="error">{errores[0].price.message}</p>
                                        :
                                        null
                                }
                            </div>
                            : null}

                        <form onSubmit={handleSubmitAgregarMenu}>
                            <div className="form-row">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Menu"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Tiempo Estimado</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Tiempo Estimado"
                                    name="finished_time"
                                    value={finished_time}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio"
                                    name="price"
                                    value={price}
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
                                <label>Categoria</label>
                                <select
                                    className="form-control"
                                    name="category"
                                    value={category}
                                    onChange={handleChange}
                                >
                                    {
                                        menu_editar_store ?
                                            <option
                                                key={menu_editar_store.category._id}
                                                value={menu_editar_store.category._id}
                                            >{menu_editar_store.category.name}</option>
                                            :
                                            <option value="">-- Seleccione una categoria --</option>
                                    }
                                    {
                                        categorias.map(categoria => (
                                            <option
                                                key={categoria._id}
                                                value={categoria._id}
                                            >{categoria.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {
                                menu_editar_store ?
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

export default CreateMenu;
