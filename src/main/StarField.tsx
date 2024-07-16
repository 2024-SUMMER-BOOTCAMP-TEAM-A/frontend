import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import personaImg from '../assets/png/persona.png';
import upButtonImg from '../assets/png/upButton.png';
import worry1 from '../assets/png/worry1.png';
import worry2 from '../assets/png/worry2.png';
import worry3 from '../assets/png/worry3.png';
import styled, { keyframes } from 'styled-components';
import {
  MainContainer, GmarketSansMedium, Moon, Image
} from '../assets/styles';
import {
  CenteredText, LeftText, RightText, Section, SectionOne, WorryImageContainer,
  WorryImage1, WorryImage2, WorryImage3, OwnglyphFont, StyledUpButtonContainer, StyledUpImage, StyledUpButtonText,
  Button, FadeOutText, FadeInText
} from '../main/mainstyles';
import RotatingCharacters from './RotatingCharacters';
import StarBackground from '../assets/StarBackground';
import LoginPage from './Login';

const StarField: React.FunctionComponent = () => {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [fadeOutCompleted, setFadeOutCompleted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const scrollToFirstSection = () => {
    firstSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartClick = () => {
    setIsStarted(true);
    setTimeout(() => {
      setFadeOutCompleted(true);
    }, 1000);
  };

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-index') || '', 10);
        if (!visibleSections.has(index)) {
          setVisibleSections(prev => new Set(prev).add(index));
        }
      }
    });
  }, [visibleSections]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    sectionsRef.current.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return (
    <MainContainer>
      <StarBackground />
      <Section ref={firstSectionRef}>
        <SectionOne>
          <Image src={personaImg} alt="Persona" />
          <Moon />
          {!fadeOutCompleted ? (
            <>
              <div style={{ marginTop: '80px', marginBottom: '60px', textAlign: 'center' }}>
                <OwnglyphFont>
                  {isStarted ? (
                    <FadeOutText>
                      안녕하세요! 저는 Persona입니다.
                    </FadeOutText>
                  ) : (
                    <FadeInText>
                      안녕하세요! 저는 Persona입니다.
                    </FadeInText>
                  )}
                </OwnglyphFont>
              </div>
              <OwnglyphFont>
                {isStarted ? (
                  <FadeOutText>
                    저와 대화를 시작하고, 원하시는 자아를 선택해 대화해보세요.
                  </FadeOutText>
                ) : (
                  <FadeInText>
                    저와 대화를 시작하고, 원하시는 자아를 선택해 대화해보세요.
                  </FadeInText>
                )}
              </OwnglyphFont>
              {!isStarted && (
                <Button onClick={handleStartClick}>
                  <GmarketSansMedium><span>시작하기</span></GmarketSansMedium>
                </Button>
              )}
            </>
          ) : (
            <>
              <LoginPage />
            </>
          )}
        </SectionOne>
      </Section>

      <Section ref={el => (sectionsRef.current[1] = el!)} data-index={1}>
        <StarBackground />
        <CenteredText>
          {visibleSections.has(1) && (
            <FadeInText>
              <WorryImageContainer>
                <WorryImage1 src={worry1} alt="Worry 1" />
                <WorryImage2 src={worry2} alt="Worry 2" />
                <WorryImage3 src={worry3} alt="Worry 3" />
              </WorryImageContainer>
              <br />
              <br />
              혹시 누군가에게 말 못할 고민이나 쉽게 꺼내기 어려운 이야기가 있으신가요?
            </FadeInText>
          )}
        </CenteredText>
      </Section>

      <Section ref={el => (sectionsRef.current[2] = el!)} data-index={2}>
        <StarBackground />
        <RotatingCharacters />
        <RightText>
          {visibleSections.has(2) && (
            <FadeInText>
              아니면 그저 시시콜콜한 이야기라도 괜찮아요.
              <br />
              <br />
              <br />
              저와 대화를 시작하고, 여러분에게 맞는 자아를 선택해보세요.
            </FadeInText>
          )}
        </RightText>
      </Section>

      <Section ref={el => (sectionsRef.current[3] = el!)} data-index={3}>
        <StarBackground />
        <LeftText>
          {visibleSections.has(3) && (
            <FadeInText>
              가장 편안하고 즐거운 대화 시간을 만들어드릴게요.
              <br />
              <br />
              <br />
              함께 이야기 나누러 가지 않을래요?
            </FadeInText>
          )}
        </LeftText>
        <StyledUpButtonContainer onClick={scrollToFirstSection}>
          <StyledUpImage src={upButtonImg} alt="Up" />
          <StyledUpButtonText><OwnglyphFont>이야기하러가기</OwnglyphFont></StyledUpButtonText>
        </StyledUpButtonContainer>
      </Section>
    </MainContainer>
  );
};

export default StarField;
