import styled from 'styled-components';

// 모달 오버레이
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 콘텐츠
export const ModalContent = styled.div`
  background: transparent; 
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10%;

  @media (max-width: 768px) {
    width: 90%;
    height: 90%;
    padding: 0 5%;
  }
`;

// 상담일지 헤더 컨테이너
export const LogHeaderContainer = styled.div`
  position: absolute;
  width: 37%;
  left: 20%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #5A639C;
  z-index: 1;
  padding: 20px;

  @media (max-width: 768px) {
    width: 80%;
    left: 10%;
    height: 60%;
  }
`;

// 상담일지 글씨 부분
export const LogHeader = styled.div`
  position: absolute;
  top: -2.5%;  
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;  
  font-size: 2em;
  font-weight: bold;
  color: #DEDDBC;
  box-sizing: border-box;

  @media (max-width: 768px) {
    top: -4.5%;  
    font-size: 1.5em;
  }
`;

// 연필 모양 이미지
export const LogHeaderImage = styled.img`
  position: absolute;
  top: 20%;  
  left: 110%;
  transform: translateX(-50%);
  width: 10%;
  display: flex;
  justify-content: center; 

  @media (max-width: 768px) {
    top: 18%;  /
    width: 15%;
  }
`;

// 상담일지 컨테이너
export const LogContainer = styled.div`
  position: absolute;
  top: 11%;
  left: 21%;
  width: 35%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #D6EAF8;
  padding: 20px;
  z-index: 2;

  @media (max-width: 768px) {
    top: 15%;
    left: 10%;
    width: 80%;
    height: 60%;
  }
`;

// 버튼 컨테이너
export const ButtonContainer = styled.div`
  position: absolute;
  right: 15%;
  top: 50%;
  transform: translateY(-50%);
  width: 20%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40%;
  z-index: 3;

  @media (max-width: 768px) {
    right: 10%;
    top: 70%;
    width: 50%;
    height: auto;
    gap: 20%;
  }
`;

export const LogImage = styled.img`
  width: auto;
  height: 50px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 40px;
    margin-bottom: 10px;
  }
`;

export const LogNickname = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1em;
  margin-bottom: 20px;
  color: black;
  &::before {
    content: "상담자 | ";
    color: gray;
  }

  @media (max-width: 768px) {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
`;

export const ChatImage = styled.img`
  width: 100%;
  height: 40%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 30%;
    margin-bottom: 10px;
  }
`;
// 상담내용
export const ChatSummary = styled.div`
  width: 100%;
  font-size: 1em;
  text-align: left;
  color: black;
  margin-bottom: 15%;
  &::before {
    content: "상담 내용";
    color: gray;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
    margin-bottom: 10px;
  }
`;

export const Solution = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1em;
  color: black;
  margin-bottom: 5%;

  &::before {
    content: "해결 방안";
    color: gray;
    font-weight: normal;
  }

  span {
    font-weight: bold;
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;

    span {
      font-size: 1.1em;
    }
  }
`;

export const PersonalitySection = styled.div`
  position: absolute;
  bottom: 40px; 
  width: 100%;
  right: 10px; 
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    bottom: 30px; 
  }
`;

export const PersonalityImage = styled.img`
  width: 7vw;  
  height: auto;  
  max-width: 50px;  
  border-radius: 50%;
  margin-right: 1vw;  

  @media (max-width: 768px) {
    width: 12vw;  
    height: auto;  
    margin-right: 2vw;  
  }

  @media (max-width: 480px) {
    width: 15vw;  
    height: auto;  
    margin-right: 3vw;  
  }
`;


export const PersonalityDescription = styled.div`
  font-size: 1em;
  color: black;
  margin-right: 10px;
  &::before {
    content: "상담사 | ";
    color: gray;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

export const LogDate = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 1em;
  color: black;
  bottom: 15px;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

// 각 버튼
const ButtonBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #98B4E6;
  border: none;
  border-radius: 55px;
  width: 60%;  
  height: 55%;  
  cursor: pointer;
  font-size: 15px;  

  &:hover {
    background-color: #789cc1;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 80%;  
    height: 45%;  
    font-size: 11px;  
  }
`;

// 다운로드 버튼 스타일
export const DownButton = styled(ButtonBase)` 
  gap: 7%;
`;

// 공유하기 버튼 스타일
export const ShareButton = styled(ButtonBase)`
  gap: 7%;
`;
export const CosultButton = styled(ButtonBase)``;
export const RankingButton = styled(ButtonBase)``;

export const GmarketSansMedium = styled.h1`
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'GmarketSansMedium', sans-serif;
  font-size: 150%;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 120%;
  }
`;
