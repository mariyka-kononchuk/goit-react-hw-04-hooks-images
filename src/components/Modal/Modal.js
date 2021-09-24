import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {Overlay, WindowModal} from './Modal.styled'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({children, onClose}) {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });
        
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    };

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <WindowModal>{children}</WindowModal>
        </Overlay>,
        modalRoot)
}

Modal.propTypes = {
    onClose:PropTypes.func.isRequired
};

