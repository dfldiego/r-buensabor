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
    const [imageFile, setimageFile] = useState({});
    const [perfil, setPerfil] = useState({
        name: '',
        email: '',
        password: '',
        new_password: '',
        new_password_repeat: '',
        telephoneNumber: 0,
        nameStreet: '',
        numberStreet: 0,
        location: '',
    });
    const { name, password, new_password, new_password_repeat, telephoneNumber, nameStreet, numberStreet, location } = perfil;
    const [imagen, setimagen] = useState({
        img: '',
    });
    const { img } = imagen;

    const dispatch = useDispatch();

    /************USAR DISPATCH: paso el nuevo state al action **********************/
    const perfil_callAction = estadoPerfil => dispatch(perfilAction(estadoPerfil));
    const actualizar_perfil_callAction = (perfil, imageFile) => dispatch(actualizarPerfilAction(perfil, imageFile));


    /*************USAR USE SELECTOR: capturo el valor de state del store  *******************/
    let abrir_modal_perfil_store = useSelector(state => state.home.abrir_modal_perfil);
    let perfil_usuario_store = useSelector(state => state.home.perfil);

    /************** METODO USE EFFECT ********************************/
    useEffect(() => {
        setPerfil({
            ...perfil,
            name: perfil_usuario_store.name,
            email: perfil_usuario_store.email,
            telephoneNumber: perfil_usuario_store.telephoneNumber,
            nameStreet: perfil_usuario_store.address.nameStreet,
            numberStreet: perfil_usuario_store.address.numberStreet,
            location: perfil_usuario_store.address.location
        });
        setimagen({
            img: perfil_usuario_store.img
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

    /************* METODO ONCHANGE PERFIL USUARIO ********************/
    var handleChange_imagen = (e) => {
        /* setPerfil({
            ...perfil,
            [e.target.name]: e.target.files[0].name,
        }); */
        setimageFile({
            ...imageFile,
            [e.target.name]: e.target.files[0],
        });
    };

    /************* METODO QUE GUARDA PERFIL USUARIO *******************/
    const handleSubmit_guardarPerfil = e => {
        e.preventDefault();

        actualizar_perfil_callAction(perfil, imageFile);

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
                                <img src={`http://localhost:4000/api/image/users/${img}`} alt="" />
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
                                        onChange={handleChange_imagen}
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
