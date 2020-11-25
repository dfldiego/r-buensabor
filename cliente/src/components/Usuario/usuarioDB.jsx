import React, { Fragment } from 'react'

const usuarioDB = ({ usuario }) => {

    const { name, email, telephoneNumber, role } = usuario;

    return (
        <Fragment>
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{telephoneNumber}</td>
                <td>{role}</td>
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
