// Loader.tsx
import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const LoaderWrapper = styled.div.attrs<{ bgColor?: string }>(({ bgColor }) => ({
  style: { backgroundColor: bgColor || 'rgba(255, 255, 255, 0.8)' },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Message = styled.p<{ messageColor?: string }>`
  font-size: 1.2em;
  color: ${({ messageColor }) => messageColor || '#333'};
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
  bgColor,
  messageColor
}) => {
  return (
    <LoaderWrapper bgColor={bgColor}>
      <ClipLoader size={size} color={color} loading={loading} />
      {loading && <Message messageColor={messageColor}>{message}</Message>}
    </LoaderWrapper>
  );
};

export default Loader;