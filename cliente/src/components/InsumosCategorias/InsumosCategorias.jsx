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
} from '../../actions/adminActions';

const InsumosCategorias = () => {

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const abrir_cerrar_agregarCategoriaInsumo = estadoAgregarCategoriaInsumo => dispatch(abrirCerrarAgregarCategoriaInsumoAction(estadoAgregarCategoriaInsumo));

    const modalAgregarCategoriaInsumo = useSelector(state => state.admin.abrir_agregar_categoria_insumo);

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
                        />

                        <button
                            href="#"
                            className="button_buscador"
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
