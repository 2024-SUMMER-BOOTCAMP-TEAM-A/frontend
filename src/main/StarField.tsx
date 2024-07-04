// 이 코드가 이상하면 아래 코드 사용해보세요

import React, { useEffect, useState, useRef } from 'react';
import personaImg from '../assets/persona.png';
import section1Img from '../assets/section1.png';
import upButtonImg from '../assets/upButton.png';
import {
  MainContainer, Section, SectionOne, CenteredText, LeftText, RightText,
  OwnglyphFont, GmarketSansMedium, Button, UpButtonContainer, UpImage, UpButtonText, Stars,
  Stars1, Stars2, ShootingStars, Moon, Image, Section1Image
} from '../assets/styles';

const ShootingStarsComponent: React.FC = () => {
  const [shootingStars, setShootingStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateShootingStars = () => {
      const numberOfStars = Math.random() < 0.5 ? 1 : 2;
      const newShootingStars = Array.from({ length: numberOfStars }, (_, index) => (
        <ShootingStars 
          key={index} 
          $top={Math.random() * window.innerHeight} 
          $left={Math.random() * window.innerWidth} 
        />
      ));
      setShootingStars(newShootingStars);
    };

    const interval = setInterval(generateShootingStars, 3000);

    // Initial generation of shooting stars
    generateShootingStars();

    return () => clearInterval(interval);
  }, []);

  return <>{shootingStars}</>;
};

const StarField: React.FC = () => {
  const firstSectionRef = useRef<HTMLDivElement>(null);

  const scrollToFirstSection = () => {
    firstSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainContainer>
      <Section ref={firstSectionRef}>
        <Stars />
        <Stars1 />
        <Stars2 />
        <ShootingStarsComponent />
        <SectionOne>
          <Image src={personaImg} alt="Persona" />
          <Moon />
          <div style={{marginTop: '80px', marginBottom: '60px', textAlign: 'center'}}>
            <OwnglyphFont>
              안녕하세요! 저는 Persona입니다.
            </OwnglyphFont>
          </div>
          <OwnglyphFont>
            저와 대화를 시작하고, 원하시는 자아를 선택해 대화해보세요.
          </OwnglyphFont>
          <Button>
            <GmarketSansMedium>시작하기</GmarketSansMedium>
          </Button>
        </SectionOne>
      </Section>

      <Section>
        <Stars />
        <Stars1 />
        <Stars2 />
        <ShootingStarsComponent />
        <Section1Image src={section1Img} alt="section1" />
        <CenteredText>
          <OwnglyphFont>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            안녕하세요! 저는 Persona입니다.
          </OwnglyphFont>
          <OwnglyphFont style={{ marginTop: '50px' }}>
            혹시 누군가에게 말 못할 고민이나 쉽게 꺼내기 어려운 이야기가 있으신가요?
          </OwnglyphFont>
        </CenteredText>
      </Section>

      <Section>
        <Stars />
        <Stars1 />
        <Stars2 />
        <ShootingStarsComponent />
        <RightText>
          <OwnglyphFont>
            아니면 그저 시시콜콜한 이야기라도 괜찮아요.
            <br/>
            <br/>
            <br/>
            저와 대화를 시작하고, 여러분에게 맞는 자아를 선택해보세요.
          </OwnglyphFont>
        </RightText>
      </Section>

      <Section>
        <Stars />
        <Stars1 />
        <Stars2 />
        <ShootingStarsComponent />
        <LeftText>
          <OwnglyphFont>
            가장 편안하고 즐거운 대화 시간을 만들어드릴게요.
            <br/>
            <br/>
            <br/>
            함께 이야기 나누러 가지 않을래요?
          </OwnglyphFont>
        </LeftText>
        <UpButtonContainer onClick={scrollToFirstSection}>
          <UpImage src={upButtonImg} alt="Up" />
          <UpButtonText>이야기하러가기</UpButtonText>
        </UpButtonContainer>
      </Section>
    </MainContainer>
  );
};

export default StarField;



// import React, { useEffect, useState, useRef } from 'react';
// import personaImg from '../assets/persona.png';
// import section1Img from '../assets/section1.png';
// import upButtonImg from '../assets/upButton.png';
// import {
//   MainContainer, Section, SectionOne, CenteredText, LeftText, RightText,
//   OwnglyphFont, GmarketSansMedium, Button, UpButtonContainer, UpImage, UpButtonText, Stars,
//   Stars1, Stars2, ShootingStars, Moon, Image, Section1Image
// } from '../assets/styles';

// const StarField: React.FC = () => {
//   const [shootingStars, setShootingStars] = useState<JSX.Element[]>([]);
//   const firstSectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const generateShootingStars = () => {
//       const numberOfStars = Math.random() < 0.5 ? 1 : 2;
//       return Array.from({ length: numberOfStars }, (_, index) => (
//         <ShootingStars 
//           key={index} 
//           $top={Math.random() * window.innerHeight} 
//           $left={Math.random() * window.innerWidth} 
//         />
//       ));
//     };

//     const interval = setInterval(() => {
//       setShootingStars(generateShootingStars());
//     }, 3000);

//     // 초기 설정
//     setShootingStars(generateShootingStars());

//     return () => clearInterval(interval);
//   }, []);

//   const scrollToFirstSection = () => {
//     firstSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <MainContainer>
//       <Section ref={firstSectionRef}>
//         <Stars />
//         <Stars1 />
//         <Stars2 />
//         {shootingStars}
//         <SectionOne>
//           <Image src={personaImg} alt="Persona" />
//           <Moon />
//           <div style={{marginTop: '80px', marginBottom: '60px', textAlign: 'center'}}>
//             <OwnglyphFont>
//               안녕하세요! 저는 Persona입니다.
//             </OwnglyphFont>
//           </div>
//           <OwnglyphFont>
//             저와 대화를 시작하고, 원하시는 자아를 선택해 대화해보세요.
//           </OwnglyphFont>
//           <Button>
//             <GmarketSansMedium>시작하기</GmarketSansMedium>
//           </Button>
//         </SectionOne>
//       </Section>

//       <Section>
//         <Stars />
//         <Stars1 />
//         <Stars2 />
      
//         <Section1Image src={section1Img} alt="section1" />
//         <CenteredText>
//           <OwnglyphFont>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//             안녕하세요! 저는 Persona입니다.
//           </OwnglyphFont>
//           <OwnglyphFont style={{ marginTop: '50px' }}>
//             혹시 누군가에게 말 못할 고민이나 쉽게 꺼내기 어려운 이야기가 있으신가요?
//           </OwnglyphFont>
//         </CenteredText>
//       </Section>

//       <Section>
//         <Stars />
//         <Stars1 />
//         <Stars2 />
        
//         <RightText>
//           <OwnglyphFont>
//             아니면 그저 시시콜콜한 이야기라도 괜찮아요.
//             <br/>
//             <br/>
//             <br/>
//             저와 대화를 시작하고, 여러분에게 맞는 자아를 선택해보세요.
//           </OwnglyphFont>
//         </RightText>
//       </Section>

//       <Section>
//         <Stars />
//         <Stars1 />
//         <Stars2 />
        
//         <LeftText>
//           <OwnglyphFont>
//             가장 편안하고 즐거운 대화 시간을 만들어드릴게요.
//             <br/>
//             <br/>
//             <br/>
//             함께 이야기 나누러 가지 않을래요?
//           </OwnglyphFont>
//         </LeftText>
//         <UpButtonContainer onClick={scrollToFirstSection}>
//           <UpImage src={upButtonImg} alt="Up" />
//           <UpButtonText>이야기하러가기</UpButtonText>
//         </UpButtonContainer>
//       </Section>
//     </MainContainer>
//   );
// };

// export default StarField;