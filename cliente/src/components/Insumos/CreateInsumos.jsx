import React, { Fragment, useState } from 'react';
import './Insumos.css';

import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import {
    abrirCerrarAgregarInsumoAction,
    crearNuevaInsumoAction,
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
    });


    const { description, purchase_price, sale_price, current_stock, min_stock, unit_measurement, is_supplies } = insumo;

    const handleChange = e => {
        setInsumo({
            ...insumo,
            [e.target.name]: e.target.value
        });
    }

    const dispatch = useDispatch();

    const cerrar_modal_callAction = nuevo_estado => dispatch(abrirCerrarAgregarInsumoAction(nuevo_estado));
    const agregar_nuevo_insumo_action = (datosNuevoInsumo) => dispatch(crearNuevaInsumoAction(datosNuevoInsumo));

    let cerrar_modal_state_store = useSelector(state => state.admin.abrir_agregar_insumo);
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

    const handleSubmitAgregarInsumo = e => {
        e.preventDefault();

        agregar_nuevo_insumo_action({ description, purchase_price, sale_price, current_stock, min_stock, unit_measurement, is_supplies });

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

export default CreateInsumos
