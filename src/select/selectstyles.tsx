import styled from 'styled-components';

// 메인 컨테이너
export const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
`;

// 카드 컨테이너
export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 90%; /* 컨테이너의 최대 너비를 줄임 */
  max-width: 1200px; /* 최대 너비를 줄임 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
`;

// 카드 슬라이더
export const CardSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%; /* 슬라이더가 컨테이너의 너비를 초과하지 않도록 함 */
`;

// 개별 카드 스타일
export const Card = styled.div`
  background: rgba(32, 27, 70, 0.7);
  border: 2px solid white;  /* 흰색 테두리 */
  border-radius: 15px;
  width: 350px;
  height: 440px;  /* 카드 높이를 조정 */
  margin: 0 30px;  /* 카드 간격을 줄임 */
  text-align: center;
  position: relative;
  padding-top: 40px; /* 이미지와 텍스트 간격을 위해 패딩 조정 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const CardImage = styled.img`
  width: 200px;
  height: 270px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const CardText = styled.div`
  color: white;
  font-size: 18px;
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  white-space: pre-line; /* 줄바꿈을 위한 스타일 추가 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

// 이미지 스타일
export const Image = styled.img`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

// 인기챗봇순위 버튼 스타일
export const RankingButton = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;
  background-color: #98B4E6; 
  color: #000000;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  z-index: 10;

  &:hover {
    background-color: #789cc1;  
  }
`;

// 상단 중앙 텍스트 스타일
export const TopCenterText = styled.h1`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 36px;
`;

// Prev 및 Next 버튼 스타일
export const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  
  &:hover {
    color: #98B4E6;
  }
`;

// 네비게이션 컨테이너 스타일
export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  
  bottom: 7%; 
  width: 100%;


 & > ${NavButton} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 30px; 
  }
`;