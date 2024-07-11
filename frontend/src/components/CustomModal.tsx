// src/components/CustomModal.tsx
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalWrapperProps {
  isOpen: boolean;
}

const ModalWrapper = styled(motion.div)<ModalWrapperProps>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: auto;
  z-index: 1001;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const Button = styled.button<{ color?: string }>`
  padding: 10px 20px;
  background: ${(props) => props.color || '#4caf50'};
  color: ${(props) => (props.color ? getContrastColor(props.color) : 'white')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  ${(props) =>
    props.color === '#ffffff' &&
    css`
      border: 1px solid #000;
    `};
`;

function getContrastColor(background: string): string {
  const hexColor = background.replace('#', '');
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);
  return brightness > 125 ? 'black' : 'white';
}

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttons?: { id: string; label: string; onClick: () => void; color?: string }[];
  showCloseButton?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  children,
  buttons,
  showCloseButton = false,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('.modal-content') === null) {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onRequestClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper
          isOpen={isOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {showCloseButton && (
              <CloseButton onClick={onRequestClose}>
                &times;
              </CloseButton>
            )}
            {title && <ModalTitle>{title}</ModalTitle>}
            {children}
            {buttons && (
              <div>
                {buttons.map((button) => (
                  <Button key={button.id} onClick={button.onClick} color={button.color}>
                    {button.label}
                  </Button>
                ))}
              </div>
            )}
          </ModalContent>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;