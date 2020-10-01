import React from 'react';

import { Modal } from '@material-ui/core';
import './ModalContainer.css';

const ModalContainer = () => {

    const { isOpenModal, closeModal, children } = Modal;

    return (
        <div>
            <Modal
                className="modal__container"
                open={isOpenModal}
                onClose={closeModal}
                closeAfterTransition
            >
                <div>{children}</div>
            </Modal>
        </div>
    )
}

export default ModalContainer;
