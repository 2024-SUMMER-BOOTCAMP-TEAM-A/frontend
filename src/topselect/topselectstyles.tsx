import styled, { keyframes } from 'styled-components';

// 메인 컨테이너
export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #020107 0%, #201b46 100%);
`;

// 텍스트 애니메이션
const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

export const Display = styled.div`
  font-family: 'Source Code Pro', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 8%;
  background-color: #3c383c;
  padding: 30px;
  width: 1000px;
  height: 500px;
  border: 20px solid #D2B48C;
  box-shadow: 0px 0px 0px 3px #654321;
  border-radius: 30px;
  color: #fff;
  z-index: 50;

  h1 {
    text-align: center;
    font-family: Garamond;
    color: #f4f4f4;
    margin-bottom: 20px;
    overflow: hidden;
    border-right: .15em solid #3c383c;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: .15em;
    animation: ${typing} 3s steps(40, end), blink-caret .75s step-end infinite;
  }
`;

// 캐릭터 이미지를 위한 컨테이너
export const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`;

// 캐릭터 이미지 스타일
const typingCharacter = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 차트를 위한 컨테이너
export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

// 캐릭터 이미지 스타일
export const CharacterImage = styled.img`
  width: 10%;
  height: 15%;
  border-radius: 50%;
  margin-bottom: 2%;
  animation: ${typingCharacter} 1s ease-out; 
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

// 뒤로 돌아가기 버튼
export const BackButton = styled.button`
  position: absolute;
  top: 5%;
  right: 7%;
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
    content: '⟲';
    font-size: 40px;
    color: #8e44ad;
    font-weight: bold;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
