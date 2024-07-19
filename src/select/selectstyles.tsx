import styled, { keyframes, css } from 'styled-components';

// 메인 컨테이너
export const MainContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #020107 0%, #201b46 100%);
`;

// 카드 컨테이너
export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 90%;
  height: 70%;
  max-width: 1500px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    height: 60%;
    width: 100%;
  }
`;

interface CardSliderProps {
  $animationDirection?: 'left' | 'right' | null;
}

export const CardSlider = styled.div<CardSliderProps>`
  display: flex;
  width: 300%;
  transition: transform 0.5s ease-in-out;
  ${({ $animationDirection }) =>
    $animationDirection === 'left' &&
    css`
      transform: translateX(-33.33%);
    `}
  ${({ $animationDirection }) =>
    $animationDirection === 'right' &&
    css`
      transform: translateX(33.33%);
    `}
`;

export const Card = styled.div<{ isActive?: boolean; isLeft?: boolean; isRight?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(32, 27, 70, 0.7);
  border: 2px solid white;
  border-radius: 40px;
  width: 40%;
  height: 550px;
  margin: 0 30px;
  text-align: center;
  padding: 20px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s ease-in-out;

  ${({ isActive, isLeft, isRight }) =>
    isActive
      ? css`
          transform: scale(1.10) rotateY(0);
          z-index: 10;
        `
      : isLeft
      ? css`
          transform: perspective(1000px) rotateY(15deg);
          z-index: 1;
        `
      : isRight
      ? css`
          transform: perspective(1000px) rotateY(-15deg);
          z-index: 1;
        `
      : css`
          transform: scale(1) rotateY(0);
          z-index: 1;
        `}

  @media screen and (max-width: 768px) {
    width: 80%;
    height: 300px;
    margin: 0 10px;
    padding: 10px;
  }
`;

export const CardImage = styled.img`
  display: flex;
  width: 230px;
  height: 300px;
  border-radius: 50%;
  margin: 20px auto 20px auto;
  @media screen and (max-width: 768px) {
    width: 150px;
    height: 200px;
  }
`;

export const CardText = styled.div`
  color: white;
  font-size: 28px;
  margin-top: 40px;
  white-space: pre-line;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin-top: 10px;
  }
`;

export const Image = styled.img`
  position: flex;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  @media screen and (max-width: 768px) {
    width: 60%;
    top: 5%;
  }
`;

const pulse = keyframes`
  from {
    box-shadow: 0 0 0 0 rgba(255, 105, 135, 0.4);
  }
  to {
    box-shadow: 0 0 0 20px rgba(255, 105, 135, 0);
  }
`;

export const RankingButton = styled.button`
  display: flex;
  position: absolute;
  top: 5%;
  right: 16%;
  background-color: #98B4E6;
  color: #000000;
  border: none;
  border-radius: 55px;
  padding: 10px 30px;
  cursor: pointer;
  font-size: 16px;
  z-index: 10;
  &:hover {
    background-color: #789cc1;
    transform: scale(1.1);
    animation: ${pulse} 1.5s infinite;
  }
  @media screen and (max-width: 768px) {
    padding: 5px 15px;
    font-size: 12px;
    top: 3%;
    right: 5%;
  }
`;

export const NavButton = styled.button`
  display: flex;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #98B4E6;
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  @media screen and (max-width: 768px) {
    bottom: 5%;
  }
  & > ${NavButton} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 30px;
    @media screen and (max-width: 768px) {
      margin: 0 10px;
    }
  }
`;

const jelly = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.05, 0.95);
  }
  50% {
    transform: scale(0.95, 1.05);
  }
  75% {
    transform: scale(1.02, 0.98);
  }
`;

export const ChatButton = styled.button`
  display: flex;
  margin-top: 70px;
  padding: 3px 70px;
  border-radius: 40px;
  background: #FFE6F2;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #FFD9E9;
    animation: ${jelly} 0.5s ease-in-out;
  }
  @media screen and (max-width: 768px) {
    margin-top: 40px;
    padding: 3px 40px;
    font-size: 14px;
  }
`;

export const ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    borderRadius: '40px',
    border: '3px solid white',
    width: '70%',
    height: '70%',
    textAlign: 'center',
    zIndex: 101,
    '@media screen and (max-width: 768px)': {
      width: '90%',
      height: 'auto',
    },
  },
} as ReactModal.Styles;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 30px 50px;
  gap: 30px;
  & > img {
    flex-shrink: 0;
    @media screen and (max-width: 768px) {
      width: 80px;
      height: auto;
    }
  }
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px;
    box-sizing: border-box;
    text-align: left;
    border-radius: 10px;
    @media screen and (max-width: 768px) {
      padding: 20px;
    }
  }
`;

export const NameText = styled.div`
  font-size: 35px;
  font-family: 'GmarketSansMedium', sans-serif;
  color: black;
  margin-top: 10px;
  text-align: center;
  margin-bottom: -30px;
  text-align: left;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin-bottom: -20px;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const FadeOutText = styled.div`
  animation: ${fadeOut} 1s ease-in-out;
  animation-fill-mode: forwards;
`;

export const FadeInText = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
`;

