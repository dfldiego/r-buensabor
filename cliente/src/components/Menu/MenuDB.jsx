import React, { Fragment } from 'react'

const MenuDB = ({ menu }) => {

    const { description, finished_time, price, category } = menu;

    return (
        <Fragment>
            <tr>
                <td>{description}</td>
                <td>{finished_time}</td>
                <td>{price}</td>
                <td>{category.name}</td>
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

export default MenuDB
