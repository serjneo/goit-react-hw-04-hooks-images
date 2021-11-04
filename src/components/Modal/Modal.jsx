import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss'

const modalRoot = document.getElementById('modal-root');

function Modal({onClose, children}) {
    useEffect(() => {
    window.addEventListener('keydown', handleKeyPressESC);

    function handleKeyPressESC(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    return () => window.removeEventListener('keydown', handleKeyPressESC);
    }, [onClose]);
  
    const handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            onClose(); 
        }
  }
  
    return createPortal(
      <div className="Overlay" onClick={handleOverlayClick}>
        <div className="Modal">{children}</div>
      </div>,
      modalRoot,
    );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;