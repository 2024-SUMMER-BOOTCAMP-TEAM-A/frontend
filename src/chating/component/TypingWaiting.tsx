import React from 'react';
import styled, { keyframes } from 'styled-components';

const typingAnimation = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const TypingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 16px;  // 폰트 사이즈
  color: rgba(60,51,176,1);  // 텍스트 색상
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: rgba(60,51,176,1);  // 텍스트 색상
  border-radius: 50%;
  animation: ${typingAnimation} 1.5s infinite;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }
`;

const TypingWaiting: React.FC = () => (
  <TypingContainer>
    <TypingDot />
    <TypingDot />
    <TypingDot />
  </TypingContainer>
);

export default TypingWaiting;