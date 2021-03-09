import React, { Fragment, useState, useEffect } from 'react';
import './Reportes.css';
import { saveAs, FileSaver } from 'file-saver';


//Actions de Redux
import {
    guardarFechasReporteRankingAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const Ranking = () => {

    const [fechas, setFechas] = useState({
        desde: '',
        hasta: ''
    });
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const guardarFechasReporteRanking = intervaloFechas => dispatch(guardarFechasReporteRankingAction(intervaloFechas));
    const archivo = useSelector(state => state.admin.archivo);

    useEffect(() => {
        if (archivo !== null) {
            console.log(archivo);
            /* const myJsonString = JSON.stringify(archivo.data); */
            /* const blob = new Blob([archivo.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Ranking.xlsx"); */

            /* var type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
            var blob = new Blob([archivo], { type: type });
            FileSaver.saveAs(blob, "ranking.xlsx"); */

            /* var file = new File([archivo.data], "hello world.xlsx", { type: "application/vnd.ms-excel;charset=utf-8" });
            saveAs(file); */

            /*  
               let blob = new Blob([archivo], { type: "text/plain;charset=utf-8" });
               console.log(blob);
               var file = new File([archivo], "hello world.xlsx", { type: "text/plain;charset=utf-8" });
               FileSaver.saveAs(file); 
            */
        }

        // eslint-disable-next-line
    }, [archivo])

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