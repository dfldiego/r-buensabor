import React, { Fragment, useState, useEffect } from 'react';
import './InsumosCategorias.css';

//importamos componentes
import ModalContainer from '../ModalContainer/ModalContainer';
import CreateInsumoCategoria from '../InsumosCategorias/CreateInsumoCategoria';
import GetInsumoCategoria from '../InsumosCategorias/GetInsumoCategoria';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {
    abrirCerrarAgregarCategoriaInsumoAction,
    obtenerCategoriaInsumoAction,
    obtenerCategoriasInsumoBuscadorAction,
} from '../../actions/adminActions';

const InsumosCategorias = () => {

    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState({
        busqueda: '',
    });

    const { busqueda } = buscador;

    const dispatch = useDispatch();

    const abrir_cerrar_agregarCategoriaInsumo = estadoAgregarCategoriaInsumo => dispatch(abrirCerrarAgregarCategoriaInsumoAction(estadoAgregarCategoriaInsumo));
    const cargarCategoriasInsumo = () => dispatch(obtenerCategoriaInsumoAction());
    const busquedaCategoriasInsumo = palabraBusqueda => dispatch(obtenerCategoriasInsumoBuscadorAction(palabraBusqueda));

    const modalAgregarCategoriaInsumo = useSelector(state => state.admin.abrir_agregar_categoria_insumo);
    const recargarTablaCategoriaInsumo = useSelector(state => state.admin.categoria_insumo_eliminar);
    const recargarTablaCategoriaInsumoAlEditar = useSelector(state => state.admin.categoria_insumo_editar);

    useEffect(() => {
        if (recargarTablaCategoriaInsumoAlEditar === null) {
            cargarCategoriasInsumo();
        }

        // eslint-disable-next-line
    }, [recargarTablaCategoriaInsumoAlEditar]);

    /** USE EFFECT: cada vez que se modifica categorias */
    useEffect(() => {
        cargarCategoriasInsumo();

        // eslint-disable-next-line
    }, [recargarTablaCategoriaInsumo]);


    const handleClick_abrir_agregar_categoriaInsumo = e => {
        e.preventDefault();

        if (openModal === false) {
            setOpenModal(true);
            abrir_cerrar_agregarCategoriaInsumo(true);
        } else {
            closeModal();
            abrir_cerrar_agregarCategoriaInsumo(false);
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    // le pasa el state principal al state local
    useEffect(() => {
        setOpenModal(modalAgregarCategoriaInsumo);

        // eslint-disable-next-line
    }, [modalAgregarCategoriaInsumo])

    const handleChangeBuscador = e => {
        setBuscador({
            ...buscador,
            [e.target.name]: e.target.value
        });
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        busquedaCategoriasInsumo(buscador);
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row one">
                    <div>
                        <button
                            href="#"
                            onClick={handleClick_abrir_agregar_categoriaInsumo}
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
                <GetInsumoCategoria />
            </div>
            { modalAgregarCategoriaInsumo ?
                <ModalContainer
                    openModal={openModal}
                    closeModal={closeModal}
                >
                    <CreateInsumoCategoria />
                </ModalContainer>
                : null
            }
        </Fragment>
    )
}

export default InsumosCategorias
