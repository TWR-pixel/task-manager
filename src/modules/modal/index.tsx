import React, { FC, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ModalsContext } from '../../../pages/_app';

import { CloseButton } from '../../../public/ui/components/modal/close-button';

interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.5);

  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  width: 50%;
  height: 60%;

  padding: 20px;

  border-radius: 8px;

  background: #555555;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 10px;

  cursor: pointer;
`;

export const Modal: FC<ModalInterface> = ({ isOpen, onClose, children }) => {
  const { closeModal } = useContext(ModalsContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <StyledCloseButton onClick={onClose} />
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};
