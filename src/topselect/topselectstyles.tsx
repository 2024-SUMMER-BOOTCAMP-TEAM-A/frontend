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

export const BackButton = styled.button`
  position: absolute;
  top: 50px;
  right: 70px;
  background-color: #E0BBE4;
  border: none;
  border-radius: 30px;
  width: 100px;
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &::before {
    content: '⟲';
    font-size: 40px;
    color: #8e44ad;
    font-weight: bold;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

// 책
export const BookContainer = styled.div`
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translateX(-50%, -50%);
  width: 650px;
  height: 620px;
  background: #D5D6BC;
  background-size: cover;
  box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  perspective: 500px;
  border-radius: 10px;

`;


export const BookCover = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ isOpen }) => (isOpen ? '#D5D6BC' : '#60584A')};
  border-radius: 10px;
  transform-origin: 0 100%;
  transition: all 2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)')};
`;