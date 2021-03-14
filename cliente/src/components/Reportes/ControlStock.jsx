import React, { Fragment } from 'react';
import './Reportes.css';

//Actions de Redux
import {
    controlarStockAction,
} from '../../actions/adminActions';
import { useDispatch } from 'react-redux';

const ControlStock = () => {

    const dispatch = useDispatch();

    const controlarStock = () => dispatch(controlarStockAction());

    const handleSubmitExportarExcel = e => {
        e.preventDefault();

        controlarStock();
    }

    return (
        <Fragment>
            <main className="container">
                <h1 className="titulo">Control de Stock</h1>
                <form onSubmit={e => handleSubmitExportarExcel(e)} className="form-report">
                    <div className="row-report">
                        <button className="btn-report">
                            Exportar a Excel
                        </button>
                    </div>
                </form>

            </main>
        </Fragment>
    )
}

export default ControlStock;
