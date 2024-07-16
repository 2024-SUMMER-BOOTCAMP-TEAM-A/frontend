import styled, { keyframes } from 'styled-components';

// 별 배경 크기 및 애니메이션 설정을 위한 상수 
export const starFieldWidth = 2560;
export const starFieldHeight = 2560;
export const starOneScrollDuration = '100s';
export const starTwoScrollDuration = '125s';
export const starThreeScrollDuration = '175s';
export const numStarOneStars = 1500;
export const numStarTwoStars = 800;
export const numStarThreeStars = 50;

// 별 애니메이션을 위한 키프레임
export const animStar = keyframes`
  0% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(${starFieldHeight}px);
  }
  100% {
    transform: translateY(${starFieldHeight}px);
  }
`;

// 유성 애니메이션을 위한 키프레임 (우측 상단에서 좌측 하단으로 이동)
export const animShootingStar = keyframes`
from {
  transform: translate(0px, 0px) rotate(45deg);
  opacity: 1;
  height: 5px;
}
to {
  transform: translate(-${starFieldWidth}px, ${starFieldHeight}px) rotate(45deg);
  opacity: 0;
  height: 800px;
}
`;

// 달 이미지가 반짝이는 애니메이션을 위한 키프레임
export const glow = keyframes`
0%, 100% {
  opacity: 1;
}
50% {
  opacity: 0.8;
}
`;

// 별 위치를 생성하는 함수
export const createStars = (n: number) => {
let stars = `${Math.random() * starFieldWidth}px ${Math.random() * starFieldHeight}px #FFF`;
for (let i = 2; i <= n; i++) {
  stars += `, ${Math.random() * starFieldWidth}px ${Math.random() * starFieldHeight}px #FFF`;
}
return stars;
};

// 전체 컨테이너
export const MainContainer = styled.div`
display: block;
position: relative;
width: 100%;
height: 100vh;
background: linear-gradient(to bottom, #020107 0%, #201b46 100%);
overflow: auto;
scroll-snap-type: y mandatory;
`;

// 시스템적인 폰트 
export const GmarketSansMedium = styled.h1`
@font-face {
  font-family: 'GmarketSansMedium';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
font-family: 'GmarketSansMedium', sans-serif;
font-size: 25px;
color: black;
`;

// MZ 폰트
export const Gothic_Goding = styled.h1`
@font-face {
  font-family: 'Gothic_Goding';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Gothic_Goding.woff') format('woff2');
  font-weight: normal;
  font-style: normal;
}
font-family: 'Gothic_Goding', sans-serif;
font-size: 15px;
color: black;
`;

// 쌈디 폰트
export const Cafe24Shiningstar = styled.h1`
@font-face {
  font-family: 'Cafe24Shiningstar';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Shiningstar.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
font-family: 'Cafe24Shiningstar', sans-serif;
font-size: 15px;
color: black;
`;

// 침착맨 폰트
export const KyoboHandwriting2020A = styled.h1`
@font-face {
  font-family: 'KyoboHandwriting2020A';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/KyoboHandwriting2020A.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
font-family: 'KyoboHandwriting2020A', sans-serif;
font-size: 15px;
color: black;
`;

// 럭키 폰트
export const Ownglyph_ryuttung_Rg = styled.h1`
@font-face {
  font-family: 'Ownglyph_ryuttung-Rg';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/Ownglyph_ryuttung-Rg.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
font-family: 'Ownglyph_ryuttung-Rg', sans-serif;
font-size: 15px;
color: black;
`;

// 가장 작은 별
export const Stars = styled.div`
z-index: 1;
width: 1px;
height: 1px;
border-radius: 50%;
background: transparent;
box-shadow: ${createStars(numStarOneStars)};
animation: ${animStar} ${starOneScrollDuration} linear infinite;
animation-delay: 0s;
position: absolute;
top: 0;
left: 0;

@media (max-width: 768px) {
  box-shadow: ${createStars(Math.floor(numStarOneStars / 2))};
}

&:after {
  content: " ";
  position: absolute;
  top: -${starFieldHeight}px;
  left: 0;
  width: 1px;
  height: 1px;
  border-radius: 50%;
  background: transparent;
  box-shadow: ${createStars(numStarOneStars)};
  animation: ${animStar} ${starOneScrollDuration} linear infinite;
  animation-delay: ${starOneScrollDuration};
}
`;

// 중간 크기 별
export const Stars1 = styled(Stars)`
z-index: 1;
width: 2px;
height: 2px;
box-shadow: ${createStars(numStarTwoStars)};
animation: ${animStar} ${starTwoScrollDuration} linear infinite;
animation-delay: 0s;

@media (max-width: 768px) {
  box-shadow: ${createStars(Math.floor(numStarTwoStars / 2))};
}

&:after {
  content: " ";
  position: absolute;
  top: -${starFieldHeight}px;
  left: 0;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: transparent;
  box-shadow: ${createStars(numStarTwoStars)};
  animation: ${animStar} ${starTwoScrollDuration} linear infinite;
  animation-delay: ${starTwoScrollDuration};
}
`;

// 가장 큰 별
export const Stars2 = styled(Stars)`
z-index: 1;
width: 3px;
height: 3px;
box-shadow: ${createStars(numStarThreeStars)};
animation: ${animStar} ${starThreeScrollDuration} linear infinite;
animation-delay: 0s;

@media (max-width: 768px) {
  box-shadow: ${createStars(Math.floor(numStarThreeStars / 2))};
}

&:after {
  content: " ";
  position: absolute;
  top: -${starFieldHeight}px;
  left: 0;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: transparent;
  box-shadow: ${createStars(numStarThreeStars)};
  animation: ${animStar} ${starThreeScrollDuration} linear infinite;
  animation-delay: ${starThreeScrollDuration};
}
`;
interface ShootingStarsProps {
top: number;
left: number;
}

export const ShootingStars = styled.div<ShootingStarsProps>`
z-index: 10;
width: 5px;
height: 85px;
border-top-left-radius: 50%;
border-top-right-radius: 50%;
position: absolute;
top: ${(props) => props.top}px;
left: ${(props) => props.left}px;
background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
animation: ${animShootingStar} 10s linear infinite;

@media (max-width: 768px) {
  width: 3px;
  height: 50px;
}
`;

// 달
export const Moon = styled.div`
  display:flex;
  border-radius: 50%;
  width: 370px;
  height: 400px;
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('data:image/jpeg;base64,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'); 
  background-size: cover;
  box-shadow: 0 0 30px 15px rgba(255, 255, 255, 0.5);
  animation: ${glow} 3s infinite;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    width: 200px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 200px;
  }
`;


// PERSONA 문구 
export const Image = styled.img`
width: 40%;
margin-bottom: 20px;
position: absolute;
top: 14%;
left: 50%;
transform: translate(-50%, -50%);
margin: 0;
text-align: center;
z-index: 2;

@media (max-width: 768px) {
  width: 25%;
  height: 30%;
}

@media (max-width: 480px) {
  width: 30%;
  height: 25%;
}
`;

