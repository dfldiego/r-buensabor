import React, { Fragment, useState, useEffect } from 'react';
import './Insumos.css';

import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarInsumoAction,
    crearNuevaInsumoAction,
    obtenerCategoriaInsumoAction,
    editarInsumoAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const CreateInsumos = () => {

    const [insumo, setInsumo] = useState({
        description: '',
        purchase_price: 0,
        sale_price: 0,
        current_stock: 0,
        min_stock: 0,
        unit_measurement: '',
        is_supplies: false,
        category: undefined,
    });


    const { description, purchase_price, sale_price, current_stock, min_stock, unit_measurement, is_supplies, category } = insumo;

    const handleChange = e => {
        setInsumo({
            ...insumo,
            [e.target.name]: e.target.value
        });
    }

    const dispatch = useDispatch();

    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarInsumoAction(nuevo_estado));
    const agregar_nuevo_insumo_action = (datosNuevoInsumo) => dispatch(crearNuevaInsumoAction(datosNuevoInsumo));
    const obtenerCategoriasInsumo = () => dispatch(obtenerCategoriaInsumoAction());
    const insumo_editar_action = (datos_insumos) => dispatch(editarInsumoAction(datos_insumos));

    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_insumo);
    const errores = useSelector(state => state.admin.errores);
    const msj_error = useSelector(state => state.admin.mensaje);
    const categoriasInsumoSelect = useSelector(state => state.admin.categoriasInsumoSelect);
    const insumo_editar = useSelector(state => state.admin.insumo_editar);

    const cerrar_modal = e => {
        e.preventDefault();
        if (cerrar_modal_state_store) {
            cerrar_modal_state_store = false;
            cerrar_modal_callAction(cerrar_modal_state_store);
        }
        return;
    }

    useEffect(() => {
        obtenerCategoriasInsumo();

        // eslint-disable-next-line
    }, []);

    const handleSubmitAgregarInsumo = e => {
        e.preventDefault();

        if (insumo_editar) {
            insumo._id = insumo_editar._id;
            insumo_editar_action(insumo);

            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        } else {
            agregar_nuevo_insumo_action({ description, purchase_price, sale_price, current_stock, min_stock, unit_measurement, is_supplies, category });

            if (errores === [] && msj_error === null) {
                cerrar_modal();
            }
        }
    }

    useEffect(() => {
        if (insumo_editar) {
            setInsumo({
                ...insumo,
                description: insumo_editar.description,
                purchase_price: insumo_editar.purchase_price,
                sale_price: insumo_editar.sale_price,
                current_stock: insumo_editar.current_stock,
                min_stock: insumo_editar.min_stock,
                unit_measurement: insumo_editar.unit_measurement,
                is_supplies: insumo_editar.is_supplies,
                category: insumo_editar.category,
            })
        }

        // eslint-disable-next-line
    }, [insumo_editar]);

    return (
        <Fragment>
            <div className="modal-insumo">
                <div className="modal-container-insumo">
                    <div className="form-container-insumo">
                        <ClearIcon
                            className="volver"
                            onClick={cerrar_modal}
                        />

                        {msj_error ? <p className="error">{msj_error}</p> : null}

                        {errores[0] ?
                            <div>
                                {
                                    errores[0].description ?
                                        <p className="error">{errores[0].description.message}</p>
                                        :
                                        null
                                }
                                {
                                    errores[0].purchase_price ?
                                        <p className="error">{errores[0].purchase_price.message}</p>
                                        :
                                        null
                                }
                                {
                                    errores[0].current_stock ?
                                        <p className="error">{errores[0].current_stock.message}</p>
                                        :
                                        null
                                }
                                {
                                    errores[0].min_stock ?
                                        <p className="error">{errores[0].min_stock.message}</p>
                                        :
                                        null
                                }
                                {
                                    errores[0].unit_measurement ?
                                        <p className="error">{errores[0].unit_measurement.message}</p>
                                        :
                                        null
                                }
                            </div>
                            : null}

                        <form onSubmit={handleSubmitAgregarInsumo}>
                            <div className="form-row">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Insumo"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Precio de Compra</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio de Compra"
                                    name="purchase_price"
                                    value={purchase_price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Precio de Venta</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio de Venta"
                                    name="sale_price"
                                    value={sale_price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Stock Actual</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Stock Actual"
                                    name="current_stock"
                                    value={current_stock}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Stock Minimo</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Stock Minimo"
                                    name="min_stock"
                                    value={min_stock}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>Unidad de Medida</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Unidad de Medida"
                                    name="unit_measurement"
                                    value={unit_measurement}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-row">
                                <label>¿Es ingrediente?</label>
                                <select
                                    className="form-control"
                                    name="is_supplies"
                                    value={is_supplies}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>-- Seleccione Verdadero o Falso --</option>
                                    <option value="true">Verdadero</option>
                                    <option value="false">Falso</option>
                                </select>
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
                                        insumo_editar ?
                                            insumo_editar.category ?
                                                <option
                                                    key={insumo_editar._id}
                                                    value={insumo_editar._id}
                                                >{insumo_editar.category.description}</option>
                                                :
                                                <option value="">-- Seleccione una categoria --</option>
                                            :
                                            <option value="">-- Seleccione una categoria --</option>
                                    }
                                    {
                                        categoriasInsumoSelect.map(categoria => (
                                            <option
                                                key={categoria._id}
                                                value={categoria._id}
                                            >{categoria.description}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {
                                insumo_editar ?
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

export default CreateInsumos
