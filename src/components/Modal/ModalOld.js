import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import {Overlay, WindowModal} from './Modal.styled'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component  {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <WindowModal>
                    {this.props.children}
                </WindowModal>
            </Overlay>, modalRoot
        )
    }  
}

Modal.propTypes = {
    onClose:PropTypes.func.isRequired
};

export default Modal;