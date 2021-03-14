import React, { Fragment, useState } from 'react';
import './Reportes.css';

//Actions de Redux
import {
    guardarCantidadPedidosClientePorFechasAction,
} from '../../actions/adminActions';
import { useDispatch } from 'react-redux';

const PedidosClientesReportes = () => {

    // state fecha
    const [fechas, setFechas] = useState({
        desde: '',
        month: '',
        year: 2021,
    });
    const [error, setError] = useState(false);

    const handleChange = e => {
        setFechas({
            ...fechas,
            [e.target.name]: e.target.value
        })
    }

    //codigo para select año
    let maxOffset = 10;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }
    const yearList = allYears.map((x) => { return (<option key={x}>{x}</option>) });

    const dispatch = useDispatch();

    const guardarCantidadPedidosClientePorFechas = intervaloFechas => dispatch(guardarCantidadPedidosClientePorFechasAction(intervaloFechas));

    const handleSubmitExportarExcel = e => {
        e.preventDefault();

        if (fechas.desde.trim() === '' && fechas.month.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        guardarCantidadPedidosClientePorFechas(fechas);

        setFechas({
            desde: '',
            month: '',
            year: 2021,
        });

    }

    return (
        <Fragment>
            <main className="container">
                <h1 className="titulo">Pedidos por Cliente</h1>

                <div>
                    <form onSubmit={e => handleSubmitExportarExcel(e)} className="form-report">
                        <div className="form-row-report">
                            <label
                                htmlFor="desde"
                                className="label-report"
                            >Diario:</label>
                            <input
                                type="date"
                                name="desde"
                                placeholder="Fecha inicial"
                                onChange={handleChange}
                                className="input-report"
                            />
                        </div>
                        <div className="row-report">
                            <button className="btn-report">
                                Pedidos Diarios
                            </button>
                        </div>
                        <div className="form-row-report">
                            <label
                                className="label-report"
                            >Año:</label>
                            <select
                                className="form-control"
                                name="year"
                                value={fechas.year}
                                onChange={handleChange}
                            >
                                {yearList}
                            </select>
                            <label
                                className="label-report"
                            >Mensual:</label>
                            <select
                                className="form-control"
                                name="month"
                                value={fechas.month}
                                onChange={handleChange}
                            >
                                <option value="">-- Seleccione un mes --</option>
                                <option value="0">enero</option>
                                <option value="1">febrero</option>
                                <option value="2">marzo</option>
                                <option value="3">abril</option>
                                <option value="4">mayo</option>
                                <option value="5">junio</option>
                                <option value="6">julio</option>
                                <option value="7">agosto</option>
                                <option value="8">setiembre</option>
                                <option value="9">octubre</option>
                                <option value="10">noviembre</option>
                                <option value="11">diciembre</option>
                            </select>
                        </div>
                        <div className="row-report">
                            <button className="btn-report">
                                Pedidos Mensuales
                            </button>
                        </div>
                    </form>
                    {
                        error ? <p className="error">Las fechas son obligatorias</p> : null
                    }
                </div>
            </main>
        </Fragment>
    )
}

export default PedidosClientesReportes;
