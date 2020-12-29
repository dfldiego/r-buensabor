import React, { Fragment, useEffect, useState } from 'react';
import './Menu.css';

import ClearIcon from '@material-ui/icons/Clear';

import { useDispatch, useSelector } from 'react-redux';
import {
    abrirCerrarAgregarMenuAction,
    obtenerCategoriasAction,
    crearNuevoMenuAction,
} from '../../actions/adminActions';


const CreateMenu = () => {

    const [menu, setMenu] = useState({
        description: '',
        finished_time: null,
        price: null,
        category: null
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
    const obtenerCategorias_callAction = () => dispatch(obtenerCategoriasAction());
    const agregar_nuevo_menu_action = (datosNuevoMenu) => dispatch(crearNuevoMenuAction(datosNuevoMenu));

    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_menu);
    const categorias = useSelector(state => state.admin.categorias);
    const errores = useSelector(state => state.admin.errores);

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

        agregar_nuevo_menu_action({ description, finished_time, price, category });
        cerrar_modal_state_store = false;
        cerrar_modal_callAction(cerrar_modal_state_store);
    }

    return (
        <Fragment>
            <div className="modal-menu">
                <div className="modal-container-menu">
                    <div className="form-container-menu">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />

                        {errores[0] ?
                            <div>
                                <p className="error">{errores[0].category.message}</p>
                                <p className="error">{errores[0].description.message}</p>
                                <p className="error">{errores[0].finished_time.message}</p>
                                <p className="error">{errores[0].price.message}</p>
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
                                <label>Categoria</label>
                                <select
                                    className="form-control"
                                    name="category"
                                    value={category}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Seleccione una categoria --</option>
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

export default CreateMenu;
