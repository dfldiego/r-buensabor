import React, { Fragment } from 'react';

const InsumoCategoriaDB = ({ categoria }) => {

    const { description, parent, img } = categoria;
    console.log(parent);
    return (
        <Fragment>
            <tr>
                <td>{description}</td>
                <td>{img}</td>
                {
                    parent ?
                        <td>{parent.description}</td>
                        :
                        <td>{null}</td>
                }
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

export default InsumoCategoriaDB;
