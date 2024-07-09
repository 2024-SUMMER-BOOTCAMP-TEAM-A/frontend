import styled, {keyframes} from 'styled-components';
import ReactModal from 'react-modal';

// 메인 컨테이너
export const MainContainer = styled.div`
  display: block;
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
  max-width: 1500px; 
  overflow: hidden; 
`;

// 카드 슬라이더
export const CardSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
`;

// 개별 카드 스타일
export const Card = styled.div`
  background: rgba(32, 27, 70, 0.7);
  border: 2px solid white; 
  border-radius: 40px;
  width: 450px;
  height: 500px;  
  margin: 0 30px;  
  text-align: center;
  position: relative;
  padding-top: 40px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer; /* 마우스 오버 시 포인터 커서 표시 */
`;

export const CardImage = styled.img`
  width: 230px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const CardText = styled.div`
  color: white;
  font-size: 25px;
  position: absolute;
  bottom: 50px;
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
  right: 7%;
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
  }
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
  left: 50%;
  transform: translateX(-50%);
  width: 100%;

 & > ${NavButton} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 30px; 
  }
`;

export const ChatButton = styled.button`
  margin-top: 70px; 
  padding: 3px 70px;
  border-radius: 40px;
  background: #CBC3E3;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #789cc1;
  }
`;

// 모달 스타일
export const ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명하게 설정
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
  },
} as ReactModal.Styles;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 30px 50px;
  gap:30px;

  & > img {
    flex-shrink: 0; // 이미지 크기 고정
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
  }
`;

export const NameText = styled.div`
  font-size: 35px;
  font-family: 'GmarketSansMedium', sans-serif;
  color: black;
  margin-top: 10px;
  text-align: center; // 중앙 정렬 추가
  margin-bottom: -30px; 
  text-align:left;
`;

// 화면 넘어갈때 애니메이션 
const fadeOut = keyframes`
  0% {
    opacity: 10;
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
    opacity: 10;
  }
`;

export const FadeOutText = styled.div`
  animation: ${fadeOut} 1s ease-in-out;
  animation-fill-mode: forwards;
`;

export const FadeInText = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
`;
