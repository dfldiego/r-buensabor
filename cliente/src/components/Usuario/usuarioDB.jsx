import React, { Fragment } from 'react'

const usuarioDB = ({ usuario }) => {

    const { nombre, apellido, domicilio, nro_domicilio, rol } = usuario;

    return (
        <Fragment>
            <tr>
                <td>{nombre}</td>
                <td>{apellido}</td>
                <td>{domicilio}</td>
                <td>{nro_domicilio}</td>
                <td>{rol}</td>
                <td>
                    <div className="acciones">
                        <button className="boton_editar">
                            Editar
                        </button>
                        <button
                            type="button"
                            className="boton_borrar"
                        >Eliminar</button>
                    </div>
                </td>
            </tr>
        </Fragment>
    )
}

export default usuarioDB
