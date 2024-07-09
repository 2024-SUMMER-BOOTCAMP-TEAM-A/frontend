import styled, { keyframes } from 'styled-components';

// 메인 페이지 시작하기 페이지의 버튼
export const Button = styled.button`
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 40px;
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  span {
    display: inline-block;
    text-align: center;
    width: 100%; 
    margin-top: 3px;
  }
`;

// 메인 페이지 이야기하러가기 버튼 컨테이너
export const UpButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%; 
  left: 70%; 
  transform: translate(-50%, -50%); // 가운데 정렬

  &:hover {
    opacity: 0.8;
  }
`;

// 이미지 애니메이션 키프레임
export const tiltLeftRight = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

// 각 섹션
export const Section = styled.div`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
`;

// 섹션 1 
export const SectionOne = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// 메인 페이지 이야기하러가기 버튼 이미지
export const UpImage = styled.img`
  width: 120px;   // 버튼 크기 조정
  height: 120px;  // 버튼 크기 조정
`;

// 메인 페이지 이야기하러가기 버튼 텍스트
export const UpButtonText = styled.div`
  color: white;
  font-size: 27px;
  margin-top: 55px;
`;

// 기본 폰트
export const OwnglyphFont = styled.h1`
  @font-face {
    font-family: 'Ownglyph_ryuttung-Rg';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/Ownglyph_ryuttung-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'Ownglyph_ryuttung-Rg', sans-serif;
  font-size: 40px;
  color: #fff;
  margin: 0;
  text-align: center;
`;

// 닉네임 입력 관련 부분 ------------------
export const InputContainer = styled.div`
 display: flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 30px;
  padding: 5px;
  top: 75%; 
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 500px;
  margin-top: 20px;
  opacity: 1; 
  z-index: 10; 
`;

export const StyledInput = styled.input`
  border: none;
  border-top-left-radius: 30px;
  background-color: #e0e0e0; 
  border-bottom-left-radius: 30px;
  padding: 10px 20px;
  font-size: 20px;
  height: 25px; 
  line-height: 40px; 
  flex: 1;
  outline: none;
  font-family: 'GmarketSansMedium', sans-serif;

  &::placeholder {
    font-family: 'GmarketSansMedium', sans-serif;
    font-size: 20px;
  }
`;

export const StyledButton = styled.button`
  background-color: #555;
  color: white;
  border: none;
  border-radius: 25px;
  width: 80px;
  height: 40px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1; 
  z-index:10;
  transform: translateX(-10px); 
  line-height: 40px; 
  &:hover {
    background-color: #777;
  } 
  span {
    display: inline-block;
    text-align: center;
    width: 100%; 
    margin-top: 3px;
  }
`;
// --------------------------------------------

// 온보딩 3P 사진 돌아가는 css
// 캐릭터 회전 애니메이션을 위한 키프레임 추가
const rotate = keyframes`
  0%, 100% {
    transform: translateX(0) scale(1);
  }
  33% {
    transform: translateX(-120%) scale(0.8);
  }
  66% {
    transform: translateX(120%) scale(0.8);
  }
`;

// 클릭 이미지 애니메이션을 위한 키프레임 추가
const clickAnimation = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(13px, 13px);
  }
`;

// 캐릭터 이미지 컨테이너 스타일 추가
export const CharacterContainer = styled.div`
 position: relative;
  width: 600px;
  height: 500px;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

// 개별 캐릭터 이미지 스타일 추가
export const Character = styled.img`
  position: absolute;
  width: 200px;
  height: 300px;
  border-radius: 50%;
  transition: transform 1s, opacity 1s;
  backface-visibility: hidden;
  z-index: 3;
  animation: ${rotate} 6s infinite;
  animation-fill-mode: both
`;

// 각 캐릭터의 회전 애니메이션 스타일 추가
export const Character1 = styled(Character)`
  z-index: 3;
  animation-delay: -2s; 
`;
export const Character2 = styled(Character)`
  z-index: 2;
  animation-delay: -4s; 
`;
export const Character3 = styled(Character)`
  z-index: 1;
  animation-delay: 0s; 
`;
// 클릭 이미지 스타일 추가
export const ClickImage = styled.img`
  position: absolute;
  width: 50px;
  height: auto;
  top: 85%; // 캐릭터 이미지 아래에 위치하도록 조정
  left: 68%;
  transform: translateX(-50%, -50%);
  z-index: 4;
  animation: ${clickAnimation} 2s infinite;
`;

// 애니메이션 정의 -> 시작하기 버튼 클릭 시 
const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 애니메이션을 위한 스타일 적용
export const FadeOutText = styled(OwnglyphFont)`
  animation: ${fadeOut} 1s ease-in-out;
  animation-fill-mode: forwards;
`;

export const FadeInText = styled(OwnglyphFont)`
  animation: ${fadeIn} 1s ease-in-out;
`;

// 텍스트 중앙 정렬 및 간격 조정
export const CenteredText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // 페이지 전체 높이를 사용하여 중앙 정렬
`;

// 텍스트 왼쪽 중앙 정렬
export const LeftText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // 중앙에서 왼쪽 정렬로 변경
  justify-content: center;
  height: 100vh; 
  padding-left: 15%; // 적절한 여백을 추가하여 왼쪽으로 이동
`;

// 텍스트 오른쪽 중앙 정렬
export const RightText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
  padding-right: 10%;  
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

// 걱정 이모지 이미지 컨테이너 정의
export const WorryImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
`;

// 걱정 이모지 이미지 스타일 정의
const dontworry = keyframes`
  0%, 100% {
    opacity: 0.2;
    z-index: 1; 
  }
  33.33% {
    opacity: 1;
    z-index: 5;
  }
`;

export const WorryImage = styled.img`
  width: 250px;
  margin: 30px;
  position: relative;
  top: -60px;
  animation: ${dontworry} 6s infinite; // 6초 동안 애니메이션 후 반복
`;

export const WorryImage1 = styled(WorryImage)`
  animation-delay: 0s; // 첫 번째 이미지 즉시 애니메이션 시작
`;

export const WorryImage2 = styled(WorryImage)`
  animation-delay: 2s; // 두 번째 이미지 2초 후 애니메이션 시작
`;

export const WorryImage3 = styled(WorryImage)`
  animation-delay: 4s; // 세 번째 이미지 4초 후 애니메이션 시작
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

export const StyledUpButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 40%;
  left: 70%;
  transform: translate(-50%, -50%);
  animation: ${bounce} 3s infinite;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const StyledUpImage = styled.img`
  width: 120px;
  height: 120px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.25);
  }
`;

export const StyledUpButtonText = styled.div`
  color: white;
  font-size: 27px;
  margin-top: 30px;
`;