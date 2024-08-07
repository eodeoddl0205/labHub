// src/components/Loader.tsx
import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const LoaderWrapper = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ bgColor }) => bgColor};
  padding: 20px;
  border-radius: 8px;
`;

const Message = styled.p<{ messageColor: string }>`
  font-size: 1.2em;
  color: ${({ messageColor }) => messageColor};
  margin-top: 10px;
`;

interface LoaderProps {
  loading: boolean;
  color?: string;
  size?: number;
  message?: string;
  bgColor?: string;
  messageColor?: string;
}

const Loader: React.FC<LoaderProps> = ({
  loading,
  color = '#4caf50',
  size = 50,
  message = 'Loading...',
  bgColor = 'rgba(255, 255, 255, 0.8)',
  messageColor = '#333'
}) => {
  return (
    <LoaderWrapper bgColor={bgColor}>
      <ClipLoader size={size} color={color} loading={loading} />
      {loading && <Message messageColor={messageColor}>{message}</Message>}
    </LoaderWrapper>
  );
};

export default Loader;
