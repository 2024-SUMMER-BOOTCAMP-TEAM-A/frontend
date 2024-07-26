import React, { useState } from 'react';
import Modal from 'react-modal';
import { Card, CardImage, CardText } from './cardstyles'; // cardstyles.tsx에서 불러오기
import styled, { keyframes } from 'styled-components';

// 메인 컨테이너
export const MainContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #020107 0%, #390097 100%);
`;

// 모달 안 흰색 배경 부분
export const ModalBackground = styled.div`
  position: absolute;
  top: -15%;
  left: -15%;
  width: 190%;
  height: 170%;
  background: rgba(255, 255, 255, 0.3);
  z-index: -1;
  @media screen and (max-width: 768px) {
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
  }
`;

// 카드 컨테이너
export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 90%;
  height: 75%;
  max-width: 1500px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    height: 65%;
    width: 100%;
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
  justify-content: center;
  align-items: center;

  &:hover {
    color: #98B4E6;
  }

  &.iconamoon--arrow-left-2-bold {
    display: inline-block;
    width: 1em;
    height: 1em;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='m14 7l-5 5m0 0l5 5'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  &.iconamoon--arrow-right-2-bold {
    display: inline-block;
    width: 1em;
    height: 1em;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='m10 17l5-5m0 0l-5-5'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var (--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    width: 30px;
    height: 30px;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  pointer-events: none;

  @media screen and (max-width: 768px) {
    top: 53%;
  }
  & > ${NavButton} {
    pointer-events: all;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
      width: 30px;
      height: 30px;
    }
  }

  & > ${NavButton}:first-child {
    position: absolute;
    left: 36.5%; /* 가운데 카드의 왼쪽에 위치 */
    transform: translateX(-100%);

    @media screen and (max-width: 768px) {
      left: 45%; /* 화면이 작을 때 위치 조정 */
    }
  }

  & > ${NavButton}:last-child {
    position: absolute;
    right: 36.5%; /* 가운데 카드의 오른쪽에 위치 */
    transform: translateX(100%);

    @media screen and (max-width: 768px) {
      right: 45%; /* 화면이 작을 때 위치 조정 */
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
  background: #CCAEBA;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #B398A3;
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
    transition: 'all 0.2s ease-in-out',
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

const ModalBackdrop = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CardComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 700); // 애니메이션 시간이 지난 후 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClicked(false);
      setIsClosing(false);
    }, 700); // 애니메이션 시간이 지난 후 카드 원위치
  };

  return (
    <>
      <Card isClicked={isClicked} isClosing={isClosing} onClick={handleClick}>
        <CardImage src="your-image-url" alt="Card Image" />
        <CardText>Your Card Text</CardText>
      </Card>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={ModalStyles}
        contentLabel="Example Modal"
      >
        <ModalContent>
          <img src="your-modal-image-url" alt="Modal Image" />
          <div>
            <NameText>Modal Title</NameText>
            <p>Modal description goes here.</p>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardComponent;
