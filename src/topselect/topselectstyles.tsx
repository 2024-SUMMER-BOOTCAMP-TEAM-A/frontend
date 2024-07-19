import styled, { keyframes } from 'styled-components';

// 메인 컨테이너
export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #020107 0%, #201b46 100%);
  z-index: 20;
  padding-top: 50px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }
`;

// 텍스트 애니메이션
const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: white; }
`;

const endTyping = keyframes`
  to { border-right: none; }
`;

// 캐릭터 이미지 애니메이션
const typingCharacter = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 빛나는 효과 애니메이션
const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #fff;
  }
  50% {
    box-shadow: 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff;
  }
  100% {
    box-shadow: 0 0 5px #fff;
  }
`;

export const Display = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 84%;
  height: 75%; 
  padding: 30px;
  background-color: #3c383c;
  border: 20px solid #D2B48C;
  box-shadow: 0px 0px 0px 3px #654321;
  border-radius: 30px;
  color: #fff;
  z-index: 20;
  margin-top: 10%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    height: auto;
    padding: 20px;
    margin-top: 0;
  }
`;

// 캐릭터 이미지를 위한 컨테이너
export const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  margin-top: 3%;
  margin-left: -5%;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    align-items: center;
  }
`;

// 1등 캐릭터를 위한 컨테이너
export const FirstPlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// 1등 캐릭터 이미지를 위한 스타일
export const FirstPlaceImage = styled.img`
  width: 150px;
  height: auto;
  border-radius: 50%;
  animation: ${typingCharacter} 1s ease-out, ${glow} 2s infinite alternate;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

// 1등 캐릭터 멘트를 위한 스타일
export const FirstPlaceComment = styled.div`
  font-size: 16px;
  color: #fff;
  margin-top: 10px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #fff;
  animation: ${typing} 3s steps(30, end), ${blinkCaret} 0.75s step-end infinite, ${endTyping} 3s forwards;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// 2, 3, 4등 캐릭터를 위한 컨테이너
export const OtherPlacesContainer = styled.div`
  display: flex;
  justify-content: center;  // 가운데 정렬로 변경
  align-items: center;
  width: 100%;
  gap: 8%;  // 이미지 간격 조절
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 5%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

// 2, 3, 4등 캐릭터 이미지를 위한 스타일
export const OtherPlaceImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 50%;
  animation: ${typingCharacter} 1s ease-out;

  @media (max-width: 768px) {
    width: 60px;
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

export const BackButton = styled.button`
  position: absolute;
  top: 5%;
  right: 16%;
  background-color: #E0BBE4;
  border: none;
  border-radius: 55px;
  padding: 10px 30px;
  width: 100px;
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    display: inline-block;
    width: 35px; 
    height: 35px; 
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%239610c6' d='M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 0 0 0-12z'/%3E%3C/svg%3E");
    font-size: 40px;
    color: #8e44ad;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    transform: scale(1.1);
    animation: ${pulse} 1.5s infinite;
  }

  @media (max-width: 768px) {
    top: 2%;
    right: 5%;
    width: 80px;
    height: 50px;

    &::before {
      font-size: 30px;
    }
  }
`;
