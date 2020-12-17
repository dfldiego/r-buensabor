import React, { Fragment, useState, useEffect } from 'react';

// Estilos
import './Perfil.css';
import '../../assets/img/sinuser.png';

// Material Icons
import ClearIcon from '@material-ui/icons/Clear';

//Actions de Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    perfilAction,
    actualizarPerfilAction,
} from '../../actions/homeActions';


const Perfil = () => {

    const [perfil, setPerfil] = useState({
        name: '',
        password: '',
        new_password: '',
        new_password_repeat: '',
        img: '',
        telephoneNumber: 0,
        nameStreet: '',
        numberStreet: 0,
        location: '',
    });
    const { name, password, new_password, new_password_repeat, img, telephoneNumber, nameStreet, numberStreet, location } = perfil;

    const dispatch = useDispatch();

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const perfil_callAction = estadoPerfil => dispatch(perfilAction(estadoPerfil));
    const actualizar_perfil_callAction = datosPerfil => dispatch(actualizarPerfilAction(datosPerfil));


    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let abrir_modal_perfil_store = useSelector(state => state.home.abrir_modal_perfil);
    let perfil_usuario_store = useSelector(state => state.home.perfil);

    /************** METODO USE EFFECT ********************************/
    useEffect(() => {
        setPerfil({
            ...perfil,
            name: perfil_usuario_store.name,
            img: perfil_usuario_store.img,
            telephoneNumber: perfil_usuario_store.telephoneNumber,
            nameStreet: perfil_usuario_store.address.nameStreet,
            numberStreet: perfil_usuario_store.address.numberStreet,
            location: perfil_usuario_store.address.location
        });
        // eslint-disable-next-line
    }, [perfil_usuario_store])

    /************** METODO PARA CERRAR MODAL *************************/
    const cerrar_modal = e => {
        e.preventDefault();
        if (abrir_modal_perfil_store) {
            abrir_modal_perfil_store = false;
            perfil_callAction(abrir_modal_perfil_store);
        }
        return;
    }

    /************* METODO ONCHANGE PERFIL USUARIO ********************/
    const handleChange_perfil = e => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        })
    }

    /************* METODO QUE GUARDA PERFIL USUARIO *******************/
    const handleSubmit_guardarPerfil = e => {
        e.preventDefault();

        actualizar_perfil_callAction(perfil);

    }


    return (
        <Fragment>
            <div className="perfil">
                <div className="perfil_container">
                    <ClearIcon
                        className="volver"
                        onClick={cerrar_modal}
                    />
                    <h5 className="centrar-texto">Nuestro Perfil</h5>
                    <div className="dos_columnas">
                        <div className="form_container_perfil">
                            <div className="circular">
                                <img src={require('../../assets/img/sinuser.png')} alt="" />
                            </div>
                        </div>
                        <div className="form_container_perfil">
                            <form onSubmit={handleSubmit_guardarPerfil}>
                                <div className="form-row">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        name="name"
                                        value={name}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Contraseña Actual</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña vieja"
                                        name="password"
                                        value={password}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Contraseña Nueva</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña vieja"
                                        name="new_password"
                                        value={new_password}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Repetir Contraseña nueva</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña vieja"
                                        name="new_password_repeat"
                                        value={new_password_repeat}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Imagen</label>
                                    <input
                                        type="file"
                                        name="img"
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Telefono</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Telefono"
                                        name="telephoneNumber"
                                        value={telephoneNumber}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Domicilio</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre Domicilio"
                                        name="nameStreet"
                                        value={nameStreet}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>N° de Domicilio</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Numero Domicilio"
                                        name="numberStreet"
                                        value={numberStreet}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Departamento</label>
                                    <input
                                        type="String"
                                        className="form-control"
                                        placeholder="Departamento"
                                        name="location"
                                        value={location}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <button
                                        className="boton_actualizar_perfil"
                                    >Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Perfil
