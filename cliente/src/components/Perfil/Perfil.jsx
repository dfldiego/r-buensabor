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
} from '../../actions/homeActions';


const Perfil = () => {

    const [perfil, setPerfil] = useState({
        name: '',
        password: '',
        img: '',
        telephoneNumber: null,
        address: '',
        numberAddress: null,
        location: ''
    });
    const { name, password, img, telephoneNumber, address, numberAddress, location } = perfil;

    const dispatch = useDispatch();

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const perfil_callAction = estadoPerfil => dispatch(perfilAction(estadoPerfil));


    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let abrir_modal_perfil_store = useSelector(state => state.home.abrir_modal_perfil);
    let perfil_usuario_store = useSelector(state => state.home.perfil);
    console.log(perfil_usuario_store);

    /************** METODO USE EFFECT ********************************/
    useEffect(() => {
        setPerfil(perfil_usuario_store);
    }, [])

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



    }


    return (
        <Fragment>
            <div className="perfil">
                <div className="perfil_container">
                    <ClearIcon
                        className="volver"
                        onClick={cerrar_modal}
                    />
                    <h2 className="centrar-texto">Nuestro Perfil</h2>
                    <div className="dos_columnas">
                        <div className="form_container_perfil">
                            <div className="circular">
                                <img src={require('../../assets/img/sinuser.png')} alt="" />
                            </div>
                        </div>
                        <div className="form_container_perfil">
                            <form onSubmit={e => handleSubmit_guardarPerfil()}>
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
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="password"
                                        value={password}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>Imagen</label>
                                    <input
                                        type="file"
                                        name="img"
                                        value={img}
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
                                        type="String"
                                        className="form-control"
                                        placeholder="Nombre Domicilio"
                                        name="address"
                                        value={address}
                                        onChange={handleChange_perfil}
                                    />
                                </div>
                                <div className="form-row">
                                    <label>N° de Domicilio</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Numero Domicilio"
                                        name="numberAddress"
                                        value={numberAddress}
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
