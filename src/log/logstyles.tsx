import styled from 'styled-components';

// 로그 영역의 메인 컨테이너
export const LogArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #98B4E6;
  border: none;
  width: 35%;
  height: 110%; 
  position: absolute;
  left: 25%;  
  top: -10%; 
  padding: 20px;
  z-index: 10;
`;

// 로그 영역의 헤더
export const LogHeader = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;

// 닉네임 섹션
export const LogNickname = styled.div`
  width: 100%;
  text-align: left;
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #fff;
`;

// 채팅 관련 이미지를 위한 섹션
export const ChatImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
`;

// 채팅 내용 요약 섹션
export const ChatSummary = styled.div`
  width: 100%;
  font-size: 1em;
  color: black;
  margin-bottom: 10px;
`;

// 해결책 섹션
export const Solution = styled.div`
  width: 100%;
  font-size: 1em;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

// 선택한 인격 섹션
export const PersonalitySection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

// 인격 이미지
export const PersonalityImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

// 인격 설명
export const PersonalityDescription = styled.div`
  font-size: 1em;
  color: black;
`;

// 날짜 섹션
export const LogDate = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1em;
  margin-top: auto; // 이 속성은 LogDate를 아래로 밀어줍니다
  color: black;
`;

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
  bottom: 15;
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
