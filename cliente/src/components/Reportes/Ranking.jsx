import React, { Fragment, useState } from 'react';
import './Reportes.css';

//Actions de Redux
import {
    guardarFechasReporteRankingAction,
} from '../../actions/adminActions';
import { useDispatch } from 'react-redux';

const Ranking = () => {

    const [fechas, setFechas] = useState({
        desde: '',
        hasta: ''
    });
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const guardarFechasReporteRanking = intervaloFechas => dispatch(guardarFechasReporteRankingAction(intervaloFechas));

    const handleChange = e => {
        setFechas({
            ...fechas,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitExportarExcel = e => {
        e.preventDefault();

        if (fechas.desde.trim() === '' && fechas.hasta.trim() === '') {
            setError(true);
            return;
        }
        setError(false);
        guardarFechasReporteRanking(fechas);
    }

    return (
        <Fragment>
            <section>
                <h1 className="titulo_reporte">Ranking Comidas más Pedidas</h1>

                <div>
                    <form onSubmit={e => handleSubmitExportarExcel(e)} className="form-report">
                        <div className="form-row-report">
                            <label
                                htmlFor="desde"
                                className="label-report"
                            >Desde:</label>
                            <input
                                type="date"
                                name="desde"
                                placeholder="Fecha inicial"
                                onChange={handleChange}
                                className="input-report"
                            />
                        </div>
                        <div className="form-row-report">
                            <label
                                htmlFor="hasta"
                                className="label-report"
                            >Hasta:</label>
                            <input
                                type="date"
                                name="hasta"
                                placeholder="Fecha final"
                                onChange={handleChange}
                                className="input-report"
                            />
                        </div>
                        <div className="row-report">
                            <button className="btn-report">
                                Exportar a excel
                            </button>
                        </div>
                        {
                            error ? <p className="error">Las fechas son obligatorias</p> : null
                        }
                    </form>
                </div>
            </section>
        </Fragment>
    )
}

export default Ranking;