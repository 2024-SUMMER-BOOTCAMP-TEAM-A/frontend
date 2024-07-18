import styled, { keyframes, css } from 'styled-components';
import ReactModal from 'react-modal';

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
  @media (max-width: 768px) {
    height: 60%;
    width: 100%;
  }
`;

// 카드 슬라이더 애니메이션
// const slideLeft = keyframes`
//   from {
//     transform: translateX(0%);
//   }
//   to {
//     transform: translateX(-33.33%);
//   }
// `;

// const slideRight = keyframes`
//   from {
//     transform: translateX(0%);
//   }
//   to {
//     transform: translateX(33.33%);
//   }
// `;

// export const CardSlider = styled.div<{ $animationDirection: 'left' | 'right' | null }>`
//   display: flex;
//   width: 300%; 
//   transition: transform 0.1s ease-in-out;
//   ${({ $animationDirection }) =>
//     $animationDirection === 'left' &&
//     css`
//       animation: ${slideLeft} 0.2s forwards;
//     `}
//   ${({ $animationDirection }) =>
//     $animationDirection === 'right' &&
//     css`
//       animation: ${slideRight} 0.2s forwards;
//     `}
// `;
const slideLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
`;

const slideRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(33.33%);
  }
`;

interface CardSliderProps {
  $animationDirection?: 'left' | 'right' | null;
}

export const CardSlider = styled.div<CardSliderProps>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $animationDirection }) =>
    $animationDirection === 'left' ? 'translateX(-100%)' : $animationDirection === 'right' ? 'translateX(100%)' : 'translateX(0)'};
`;

// 개별 카드 스타일
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  background: rgba(32, 27, 70, 0.7);
  border: 2px solid white; 
  border-radius: 40px;
  width: 30%; 
  height: 500px;  
  margin: 0 30px;  
  text-align: center;
  padding: 20px 10px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer; 
  transition: transform 0.2s ease-in-out; 

  &:hover {
    transform: scale(1.10); 
  }

  @media (max-width: 768px) {
    width: 80%; 
    height: 300px; 
    margin: 0 10px; 
    padding: 10px;
  }

  @media (max-width: 480px) {
    width: 90%;
    height: 250px;
    margin: 0 5px;
    padding: 5px;
  }
`;

export const CardImage = styled.img`
  display: flex;
  width: 230px;
  height: 300px;
  border-radius: 50%;
  margin: 20px auto 20px auto; 
  @media (max-width: 768px) {
    width: 150px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 160px;
  }
`;

export const CardText = styled.div`
  color: white;
  font-size: 28px; 
  margin-top: 20px; /* 텍스트와 이미지 사이에 마진 추가 */
  white-space: pre-line; 
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: 5px;
  }
`;
// 이미지 스타일
export const Image = styled.img`
  position: flex;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 768px) {
    width: 60%;
    top: 5%;
  }

  @media (max-width: 480px) {
    width: 80%;
    top: 5%;
  }
`;

// 인기챗봇순위 버튼 스타일
export const RankingButton = styled.button`
  display: flex;
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
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    padding: 5px 15px;
    font-size: 12px;
    top: 3%;
    right: 5%;
  }

  @media (max-width: 480px) {
    padding: 3px 10px;
    font-size: 10px;
    top: 2%;
    right: 4%;
  }
`;

// Prev 및 Next 버튼 스타일
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
  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
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

  @media (max-width: 768px) {
    bottom: 5%;
  }

  @media (max-width: 480px) {
    bottom: 4%;
  }

  & > ${NavButton} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 30px; 

    @media (max-width: 768px) {
      margin: 0 10px;
    }

    @media (max-width: 480px) {
      margin: 0 5px;
    }
  }
`;

export const ChatButton = styled.button`
  display: flex;
  margin-top: 70px; 
  padding: 3px 70px;
  border-radius: 40px;
  background: #CBC3E3;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #789cc1;
  }
  @media (max-width: 768px) {
    margin-top: 40px; 
    padding: 3px 40px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    margin-top: 30px;
    padding: 3px 30px;
    font-size: 12px;
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
    '@media (max-width: 768px)': {
      width: '90%',
      height: 'auto',
    },
    '@media (max-width: 480px)': {
      width: '95%',
      height: 'auto',
    }
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

    @media (max-width: 768px) {
      width: 80px;
      height: auto;
    }

    @media (max-width: 480px) {
      width: 60px;
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

    @media (max-width: 768px) {
      padding: 20px;
    }

    @media (max-width: 480px) {
      padding: 10px;
    }
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

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: -20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: -10px;
  }
`;

// 화면 넘어갈때 애니메이션 
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