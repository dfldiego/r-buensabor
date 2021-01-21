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
    obtenerCategoriasInsumoBuscadorAction,
} from '../../actions/adminActions';

const InsumosCategorias = () => {

    const [openModal, setOpenModal] = useState(false);
    const [buscador, setBuscador] = useState('');

    const dispatch = useDispatch();

    const abrir_cerrar_agregarCategoriaInsumo = estadoAgregarCategoriaInsumo => dispatch(abrirCerrarAgregarCategoriaInsumoAction(estadoAgregarCategoriaInsumo));
    const cargarCategoriasInsumo = (indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda) => dispatch(obtenerCategoriasInsumoBuscadorAction(indexPrimerUsuario, limite_state, paginaCorriente_state, palabraBusqueda));

    const modalAgregarCategoriaInsumo = useSelector(state => state.admin.abrir_agregar_categoria_insumo);
    const recargarTablaCategoriaInsumo = useSelector(state => state.admin.categoria_insumo_eliminar);
    const recargarTablaCategoriaInsumoAlEditar = useSelector(state => state.admin.categoria_insumo_editar);
    const limite_state = useSelector(state => state.admin.limite);
    let paginaCorriente_state = useSelector(state => state.admin.paginaCorriente);
    let palabraBuscar_state = useSelector(state => state.admin.palabraBuscar);
    let desde_state = useSelector(state => state.admin.desde);

    useEffect(() => {
        cargarCategoriasInsumo(desde_state, limite_state, paginaCorriente_state, palabraBuscar_state);

        // eslint-disable-next-line
    }, [recargarTablaCategoriaInsumoAlEditar, modalAgregarCategoriaInsumo]);

    useEffect(() => {
        cargarCategoriasInsumo(0, limite_state, paginaCorriente_state, palabraBuscar_state);

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
        setBuscador(e.target.value);
    }

    const handleClick_buscador = e => {
        e.preventDefault();
        paginaCorriente_state = 0;
        cargarCategoriasInsumo(0, limite_state, paginaCorriente_state, buscador);
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
