import {useEffect} from 'react';
import { createPortal } from 'react-dom';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
  StyledModalOverlay,
  StyledModal,
  StyledModalBtnClose,
  StyledModalImgWr,
} from './Modal.styled';

const modalRoot = document.getElementById('modal-root');



export default function Modal({onClose, children }) {

  useEffect(() => {
    const closeModal = ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [onClose]);



  return createPortal(
    <StyledModalOverlay onClick={onClose}>
      <StyledModal>
        <StyledModalBtnClose>
          <AiOutlineCloseCircle onClick={onClose} />
        </StyledModalBtnClose>
        <StyledModalImgWr>{children}</StyledModalImgWr>
      </StyledModal>
    </StyledModalOverlay>,
    modalRoot
  );
}

