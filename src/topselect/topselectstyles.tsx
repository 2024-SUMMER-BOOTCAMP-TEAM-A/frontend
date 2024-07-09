import styled, { keyframes } from 'styled-components';

// 메인 컨테이너
export const MainContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #020107 0%, #201b46 100%);
`;

const StyledContainer = styled.div`
  .container {
    text-align: center;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #4A90E2;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #357ABD;
  }
`;

export default StyledContainer;

// 화면 넘어갈때 애니메이션 
const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const FadeOutText = styled.div`
  animation: ${fadeOut} 1s ease-in-out;
  animation-fill-mode: forwards;
`;

export const FadeInText = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
`;