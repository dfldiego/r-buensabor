import React, { Fragment, useState, useEffect } from 'react'
import './Configuracion.css';

//Actions de Redux
import {
    editarConfiguracionAction,
    obtenerConfiguracionAction,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const Configuracion = () => {

    const [configuracion, setConfiguracion] = useState(null);
    const [error, setError] = useState(false);

    const handleChange = e => {
        setConfiguracion({
            ...configuracion,
            [e.target.name]: e.target.value
        });
    }

    const dispatch = useDispatch();

    const editarConfiguracion = datosConfiguracion => dispatch(editarConfiguracionAction(datosConfiguracion));
    const obtenerConfiguracion = () => dispatch(obtenerConfiguracionAction());

    let datosConfiguracionDB = useSelector(state => state.admin.configuracion);

    const handleSubmitModificarConfiguracion = e => {
        e.preventDefault();

        // validar espacios vacios
        if (configuracion.email.trim() === '' || configuracion.password.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        editarConfiguracion(configuracion);

    }

    useEffect(() => {
        obtenerConfiguracion();

        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        if (datosConfiguracionDB) {
            setConfiguracion(datosConfiguracionDB);
        }

        // eslint-disable-next-line
    }, [datosConfiguracionDB])

    return (
        <Fragment>
            <h1 className="centrar_titulo">Pagina de Configuracion</h1>
            <div className="form_container_configuracion">
                <form onSubmit={e => handleSubmitModificarConfiguracion(e)}>
                    {
                        configuracion ?
                            <div>
                                <div className="form-row">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ingrese su Email"
                                        name="email"
                                        value={configuracion.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Contraseña:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Ingrese su Contraseña"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                >Editar</button>
                                {error ? <p className="error">Todos los campos son obligatorios</p> : null}
                            </div>
                            : null
                    }
                </form>
            </div>
        </Fragment>
    )
}

export default Configuracion
