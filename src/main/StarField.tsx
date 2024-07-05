import React, { useEffect, useState, useRef } from 'react';
import personaImg from '../assets/persona.png';
import section1Img from '../assets/section1.png';
import upButtonImg from '../assets/upButton.png';
import styled, { keyframes } from 'styled-components';
import {
  MainContainer, GmarketSansMedium, Stars,
  Stars1, Stars2, ShootingStars, Moon, Image
} from '../assets/styles';
import {
  CenteredText, LeftText, RightText, Section, SectionOne,
  OwnglyphFont, Button, UpButtonContainer, UpImage, UpButtonText, Section1Image, InputContainer, StyledInput, StyledButton, FadeOutText, FadeInText
} from '../main/mainstyles';
import RotatingCharacters from './RotatingCharacters';

const ShootingStarsComponent: React.FunctionComponent = () => {
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

    // 초기 별똥별 생성
    generateShootingStars();

    return () => clearInterval(interval);
  }, []);

  return <>{shootingStars}</>;
};

const StarField: React.FunctionComponent = () => {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [fadeOutCompleted, setFadeOutCompleted] = useState(false);

  const scrollToFirstSection = () => {
    firstSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartClick = () => {
    setIsStarted(true);
    setTimeout(() => {
      setFadeOutCompleted(true);
    }, 1000); // fadeOut 애니메이션 시간과 일치
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
          {!fadeOutCompleted ? (
            <>
              <div style={{ marginTop: '80px', marginBottom: '60px', textAlign: 'center' }}>
                {isStarted ? (
                  <FadeOutText>
                    안녕하세요! 저는 Persona입니다.
                  </FadeOutText>
                ) : (
                  <OwnglyphFont>
                    안녕하세요! 저는 Persona입니다.
                  </OwnglyphFont>
                )}
              </div>
              {isStarted ? (
                <FadeOutText>
                  저와 대화를 시작하고, 원하시는 자아를 선택해 대화해보세요.
                </FadeOutText>
              ) : (
                <OwnglyphFont>
                  저와 대화를 시작하고, 원하시는 자아를 선택해 대화해보세요.
                </OwnglyphFont>
              )}
              {!isStarted && (
                <Button onClick={handleStartClick}>
                  <GmarketSansMedium><span>시작하기</span></GmarketSansMedium>
                </Button>
              )}
            </>
          ) : (
            <>
              <div style={{ marginTop: '50px', marginBottom: '60px', textAlign: 'center' }}>
                <FadeInText>
                  잠깐! 아직 이름을 안 물어봤네요.
                </FadeInText>
              </div>
              <FadeInText>
                어떻게 불러드릴까요? 닉네임을 알려주세요!
              </FadeInText>
              <InputContainer>
                <StyledInput type="text" placeholder="닉네임을 입력하세요" />
                <StyledButton>
                  <GmarketSansMedium style={{ color: 'white', fontSize: '20px' }}><span>입력</span></GmarketSansMedium>
                </StyledButton>
              </InputContainer>
            </>
          )}
        </SectionOne>
      </Section>

      <Section>
        <Stars />
        <Stars1 />
        <Stars2 />
        <ShootingStarsComponent />
        <Section1Image src={section1Img} alt="section1" />
        <CenteredText>
          <OwnglyphFont className="fadeInText">
            <br />
            <br />
            <br />
            <br />
            <br />
            안녕하세요! 저는 Persona입니다.
          </OwnglyphFont>
          <OwnglyphFont className="fadeInText" style={{ marginTop: '50px' }}>
            혹시 누군가에게 말 못할 고민이나 쉽게 꺼내기 어려운 이야기가 있으신가요?
          </OwnglyphFont>
        </CenteredText>
      </Section>
      
      <Section>
        <Stars />
        <Stars1 />
        <Stars2 />
        <ShootingStarsComponent />
        <RotatingCharacters /> {/* 회전하는 캐릭터 추가 */}
        <RightText>
          <OwnglyphFont className="fadeInText">
            아니면 그저 시시콜콜한 이야기라도 괜찮아요.
            <br />
            <br />
            <br />
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
          <OwnglyphFont className="fadeInText">
            가장 편안하고 즐거운 대화 시간을 만들어드릴게요.
            <br />
            <br />
            <br />
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
