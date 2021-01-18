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
} from '../../actions/adminActions';

const Categorias = () => {

    //useState locales
    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState('');

    const dispatch = useDispatch();

    // enviar a store
    const abrir_cerrar_agregarCategoria = estadoAgregarCategoria => dispatch(abrirCerrarAgregarCategoriaAction(estadoAgregarCategoria));
    const busqueda_categorias = (indexPrimerUsuario, limit, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerCategoriasBuscadorAction(indexPrimerUsuario, limit, paginaCorriente_state, palabraBusqueda));
    const cargarcategorias = (indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerCategoriasBuscadorAction(indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda));

    // recibir de store
    const modalAgregarCategoria = useSelector(state => state.admin.abrir_agregar_categoria);
    const recargarTablaCategorias = useSelector(state => state.admin.categoria_eliminar);
    const limite_state = useSelector(state => state.admin.limite);
    let paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);
    let palabraBuscar_state = useSelector(state => state.admin.palabraBuscar);

    /** USE EFFECT: cada vez que se modifica categorias */
    useEffect(() => {
        //llamar la funcion
        cargarcategorias(0, limite_state, paginaCorriente_state, palabraBuscar_state);
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
        setBuscador(e.target.value);
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        paginaCorriente_state = 0;
        busqueda_categorias(0, limite_state, paginaCorriente_state, buscador);
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
                            name="buscador"
                            className="input_buscador"
                            onChange={handleChangeBuscador}
                            value={buscador}
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
