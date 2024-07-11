import styled, { keyframes } from 'styled-components';

// 버튼 컨테이너 스타일
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  align-items: flex-end;
  height: 70%; 
  width: 100%;
  position: absolute;
  right: 0;
  top: 15%; 
  bottom:15;
  bottom: 0;
  margin-right: 15%;
`;

// 버튼 스타일 기본 설정
const ButtonBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #98B4E6;
  border: none;
  border-radius: 30px;
  width: 10%;
  height: 10%; 
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: #789cc1;
    transform: scale(1.1);
  }
`;

// 다운로드 버튼
export const DownButton = styled(ButtonBase)``;

// 공유하기 버튼
export const ShareButton = styled(ButtonBase)``;

// 상담하러 가기 버튼
export const CosultButton = styled(ButtonBase)``;

// 인기 챗봇 보기 버튼
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
`;

// 상담일지 영역 스타일
export const LogArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #98B4E6;
  border: none;
  width: 35%;
  height: 120%; 
  position: absolute;
  left: 30%;  
  top: -10%;  
  z-index: 10;
`;