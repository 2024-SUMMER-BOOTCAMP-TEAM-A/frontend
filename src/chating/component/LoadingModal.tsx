import React from 'react';
import styled, { keyframes } from 'styled-components';

const Main = styled.div`
  width: 90vw;
  margin: 0 auto;
  text-align: center;
`;

const OwnglyphFont = styled.h1`
  @font-face {
    font-family: 'Ownglyph_ryuttung-Rg';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/Ownglyph_ryuttung-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'Ownglyph_ryuttung-Rg', sans-serif;
  font-size: clamp(20px, 3vw, 40px);
  color: #fff;
  margin: 0;
  text-align: center; // 텍스트 중앙 정렬 추가
  padding: 0 20px; // 양옆 패딩 추가
`;

const DropletSpinner = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Droplet = styled.div`
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background-color: #e14242;
  border-radius: 50%;
  transform-origin: center bottom;
  animation: ${bounce} 1.2s cubic-bezier(0.3, 0.01, 0.4, 1) infinite;

  &:nth-child(1) {
    background-color: #003B59; /* Deep blue */
    animation-delay: -0.4s;
  }
  &:nth-child(2) {
    background-color: #00838F; /* Teal */
    animation-delay: -0.2s;
  }
  &:nth-child(3) {
    background-color: #82E5BE; /* Light green */
    animation-delay: 0s;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingMessage = styled.div`
  color: white;
  margin-top: 20px;
  font-size: 1.2em;
`;

const LoadingModal: React.FC = () => {
  return (
    <LoadingOverlay>
      <DropletSpinner>
        <Droplet />
        <Droplet />
        <Droplet />
      </DropletSpinner>
      <LoadingMessage>
        <OwnglyphFont>
          상담일지가 작성 중 입니다
        </OwnglyphFont>
      </LoadingMessage>
    </LoadingOverlay>
  );
};

export default LoadingModal;
