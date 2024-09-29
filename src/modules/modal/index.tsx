import React, { FC } from 'react';
import styled from 'styled-components';
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #555555;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  height: 60%;
  position: relative;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 10px;

  cursor: pointer;
`;

export const Modal: FC<ModalInterface> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <StyledCloseButton onClick={onClose} />
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};
