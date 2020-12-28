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
} from '../../actions/adminActions';

const Categorias = () => {

    //useState locales
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    // enviar a store
    const abrir_cerrar_agregarCategoria = estadoAgregarCategoria => dispatch(abrirCerrarAgregarCategoriaAction(estadoAgregarCategoria));

    // recibir de store
    const modalAgregarCategoria = useSelector(state => state.admin.abrir_agregar_categoria);

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
                        />

                        <button
                            href="#"
                            className="button_buscador"
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
