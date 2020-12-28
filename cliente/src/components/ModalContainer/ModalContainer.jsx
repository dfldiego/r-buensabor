import React from 'react';

import { Modal } from '@material-ui/core';
import './ModalContainer.css';

const ModalContainer = (props) => {

    const { openModal, closeModal, children } = props;
    return (
        <div>
            <Modal
                className="modal__container"
                open={openModal}
                onClose={closeModal}
                closeAfterTransition
            >
                <div>{children}</div>
            </Modal>
        </div>
    )
}

export default ModalContainer;
