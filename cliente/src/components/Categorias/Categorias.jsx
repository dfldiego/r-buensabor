import React, { Fragment, useState, useEffect } from 'react';
import './Categorias.css';

//importamos componentes
import ModalContainer from '../ModalContainer/ModalContainer';
import CreateCategoria from '../Categorias/CreateCategoria';
import GetCategoria from '../Categorias/GetCategorias';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarCategoriaAction,
    obtenerCategoriasBuscadorAction,
    obtenerCategoriasAction,
} from '../../actions/adminActions';

const Categorias = () => {

    //useState locales
    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState({
        busqueda: '',
    });

    const { busqueda } = buscador;

    const dispatch = useDispatch();

    // enviar a store
    const abrir_cerrar_agregarCategoria = estadoAgregarCategoria => dispatch(abrirCerrarAgregarCategoriaAction(estadoAgregarCategoria));
    const busqueda_categorias = palabraBusqueda => dispatch(obtenerCategoriasBuscadorAction(palabraBusqueda));
    const cargarcategorias = () => dispatch(obtenerCategoriasAction());

    // recibir de store
    const modalAgregarCategoria = useSelector(state => state.admin.abrir_agregar_categoria);
    const recargarTablaCategorias = useSelector(state => state.admin.categoria_eliminar);

    /** USE EFFECT: cada vez que se modifica categorias */
    useEffect(() => {
        //llamar la funcion
        cargarcategorias();
        // eslint-disable-next-line
    }, [recargarTablaCategorias]);

    const handleClick_abrir_agregar_categoria = e => {
        e.preventDefault();

        if (openModal === false) {
            setOpenModal(true);
            abrir_cerrar_agregarCategoria(true);
        } else {
            closeModal();
            abrir_cerrar_agregarCategoria(false);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // le pasa el state principal al state local
    useEffect(() => {
        setOpenModal(modalAgregarCategoria);
        // eslint-disable-next-line
    }, [modalAgregarCategoria])

    const handleChangeBuscador = e => {
        setBuscador({
            ...buscador,
            [e.target.name]: e.target.value
        });
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        busqueda_categorias(buscador);
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row one">
                    <div>
                        <button
                            href="#"
                            onClick={handleClick_abrir_agregar_categoria}
                        >Agregar Categoria</button>
                    </div>
                    <div className="buscador">
                        <input
                            type="text"
                            name="busqueda"
                            className="input_buscador"
                            onChange={handleChangeBuscador}
                            value={busqueda}
                        />

                        <button
                            href="#"
                            className="button_buscador"
                            onClick={handleClick_buscador}
                        >Buscar</button>
                    </div>
                </div>
                <GetCategoria />
            </div>
            { modalAgregarCategoria ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    <CreateCategoria />
                </ModalContainer>
                : null
            }
        </Fragment>
    )
}

export default Categorias
