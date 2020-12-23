import React from 'react'
import { Fragment } from 'react';

const CategoriaDB = ({ categoria }) => {

    const { name } = categoria;

    return (
        <Fragment>
            <tr>
                <td>{name}</td>
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

export default CategoriaDB
