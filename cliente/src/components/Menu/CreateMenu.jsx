import React, { Fragment, useEffect, useState } from 'react';
import './Menu.css';
import btn_x from '../../assets/img/boton-x.png';

import ClearIcon from '@material-ui/icons/Clear';

import {
    abrirCerrarAgregarMenuAction,
    crearNuevoMenuAction,
    obtenerCategoriasAction,
    editarMenuAction,
    obtenerInsumosAction,
    obtenerIngredientesAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const CreateMenu = () => {

    let nombreInsumo = '';
    const [imageFile, setimageFile] = useState(null);
    const [ingredientes, setIngredientes] = useState([]);

    /************* MENUS **************/
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

    /************* DETALLE MENU **************/
    const [menuDetail, setMenuDetail] = useState({
        product: '',
        quantity: 0,
        unit_measurement: '',
    });

    const { product, quantity, unit_measurement } = menuDetail;

    const handleChangeMenuDetail = e => {
        setMenuDetail({
            ...menuDetail,
            [e.target.name]: e.target.value
        });
    }


    /************* ERROR EN INGREDIENTES *****************/
    const [ErrorIngrediente, setErrorIngrediente] = useState(null);

    const dispatch = useDispatch();

    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarMenuAction(nuevo_estado));
    const agregar_nuevo_menu_action = (datosNuevoMenu, imageFile, ingredientes) => dispatch(crearNuevoMenuAction(datosNuevoMenu, imageFile, ingredientes));
    const obtenerCategorias = () => dispatch(obtenerCategoriasAction());
    const menu_editar_action = (datosmenu, imageFile, IngredientesDB, ingredientes) => dispatch(editarMenuAction(datosmenu, imageFile, IngredientesDB, ingredientes));
    const obtenerInsumos = () => dispatch(obtenerInsumosAction());
    const obtenerIngredientes = () => dispatch(obtenerIngredientesAction());

    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_menu);
    const errores = useSelector(state => state.admin.errores);
    const msj_error = useSelector(state => state.admin.mensaje);
    const categoriasSelect = useSelector(state => state.admin.categoriasSelect);
    const menu_editar_store = useSelector(state => state.admin.menu_editar);
    const insumos = useSelector(state => state.admin.insumos);
    const IngredientesDB = useSelector(state => state.admin.ingredientes_menu_detalle);
    const IngredientesEdit = useSelector(state => state.admin.menu_detalle_editar);

    const cerrar_modal = () => {
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    useEffect(() => {
        obtenerCategorias();
        obtenerInsumos();
        obtenerIngredientes();
        if (IngredientesEdit) {
            setIngredientes(IngredientesEdit);
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (menu_editar_store) {
            setMenu({
                ...menu,
                description: menu_editar_store.description,
                finished_time: menu_editar_store.finished_time,
                price: menu_editar_store.price,
                category: menu_editar_store.category
            });
        }

        // eslint-disable-next-line
    }, [menu_editar_store])

    var handleChange_imagen = (e) => {
        setimageFile({
            ...imageFile,
            [e.target.name]: e.target.files[0],
        });
    };

    // METODO PARA AGREGAR INGREDIENTE AL MENU.
    const handleClickAgregarIngrediente = e => {
        e.preventDefault();

        if (product === '' || quantity === 0 || unit_measurement === '') {
            setErrorIngrediente('Todos los datos del insumo son obligatorios');
            return;
        }
        setErrorIngrediente(null);

        // con el id de product obtener el description de insumo
        insumos.map(insumo => insumo._id === product ? nombreInsumo = insumo.description : null);

        menuDetail.description = nombreInsumo;

        setIngredientes([
            ...ingredientes,
            menuDetail
        ])

        setMenuDetail({
            product: '',
            quantity: 0,
            unit_measurement: '',
        })

    }

    // METODO PARA ELIMINAR INGREDIENTE DEL MENU.
    const handleClickELiminarIngrediente = (e, ingrediente) => {
        e.preventDefault();
        const nuevosIngredientes = ingredientes.filter(item => item.product !== ingrediente.product);
        setIngredientes(nuevosIngredientes);
    }

    // METODO PARA CREAR MENU.
    const handleSubmitAgregarMenu = e => {
        e.preventDefault();

        if (menu_editar_store) {
            menu._id = menu_editar_store._id;
            menu_editar_action(menu, imageFile, IngredientesDB, ingredientes);

            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        } else {
            agregar_nuevo_menu_action({ description, finished_time, price, category }, imageFile, ingredientes)

            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        }
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
                                            menu_editar_store.category ?
                                                <option
                                                    key={menu_editar_store._id}
                                                    value={menu_editar_store._id}
                                                >{menu_editar_store.category.name}
                                                </option>
                                                :
                                                <option value="">-- Seleccione una categoria --</option>
                                            :
                                            <option value="">-- Seleccione una categoria --</option>
                                    }
                                    {
                                        categoriasSelect.map(categoria => (
                                            <option
                                                key={categoria._id}
                                                value={categoria._id}
                                            >{categoria.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="borde_arriba">
                                <h4>Agregar insumos al menú</h4>
                            </div>
                            <div className="form-row">
                                <label>Ingredientes</label>
                                <select
                                    className="form-control"
                                    name="product"
                                    value={product}
                                    onChange={handleChangeMenuDetail}
                                >
                                    {
                                        insumos ?
                                            insumos.is_supplies ?
                                                <option
                                                    key={insumos._id}
                                                    value={insumos._id}
                                                >{insumos.description}
                                                </option>
                                                :
                                                <option value="">-- Seleccione un ingrediente --</option>
                                            :
                                            <option value="">-- Seleccione un ingrediente --</option>
                                    }
                                    {
                                        insumos.map(insumo => (
                                            insumo.is_supplies ?
                                                <option
                                                    key={insumo._id}
                                                    value={insumo._id}
                                                >{insumo.description}</option>
                                                : null
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Cantidad</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Cantidad"
                                    name="quantity"
                                    value={quantity}
                                    onChange={handleChangeMenuDetail}
                                />
                            </div>
                            <div className="form-row">
                                <label>Unidad de Medida</label>
                                <select
                                    className="form-control"
                                    name="unit_measurement"
                                    value={unit_measurement}
                                    onChange={handleChangeMenuDetail}
                                >
                                    <option value="">-- Seleccione una unidad de medida --</option>
                                    <option value="litros">litros</option>
                                    <option value="kilogramos">kilogramos</option>
                                    <option value="unidades">unidades</option>
                                </select>
                            </div>

                            {ErrorIngrediente !== null ? <p className="error">{ErrorIngrediente}</p> : null}

                            <button
                                type="submit"
                                onClick={(e) => handleClickAgregarIngrediente(e)}
                            >Agregar Ingrediente</button>
                            <table className="tabla_ingredientes">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Unidad de Medida</th>
                                        <th scope="col">Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        ingredientes ?
                                            ingredientes.map((ingrediente, index) => (
                                                <tr key={index}>
                                                    {
                                                        IngredientesEdit.length !== 0 ?
                                                            ingrediente.status ?
                                                                <td>{ingrediente.product.description}</td>
                                                                :
                                                                <td>{ingrediente.description}</td>
                                                            :
                                                            <td>{ingrediente.description}</td>
                                                    }
                                                    <td>{ingrediente.quantity}</td>
                                                    <td>{ingrediente.unit_measurement}</td>
                                                    <td>
                                                        <button className="boton_eliminar">
                                                            <img src={btn_x} alt="tacho" className="btn_x" onClick={e => handleClickELiminarIngrediente(e, ingrediente)} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            : null
                                    }
                                </tbody>
                            </table>
                            {
                                menu_editar_store ?
                                    <button
                                        type="submit"
                                    >Editar Menú</button>
                                    :
                                    <button
                                        type="submit"
                                    >Crear Menú</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateMenu;
