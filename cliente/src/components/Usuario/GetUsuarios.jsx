import React from 'react';
import './GetUsuarios.css';

const GetUsuarios = () => {
    return (
        <div>
            <h2 className="titulo">Listado de Usuarios</h2>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Domicilio</th>
                        <th>Nro. Domicilio</th>
                        <th>Rol</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default GetUsuarios;