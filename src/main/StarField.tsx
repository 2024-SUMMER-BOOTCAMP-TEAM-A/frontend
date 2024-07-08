import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import personaImg from '../assets/png/persona.png';
import upButtonImg from '../assets/png/upButton.png';
import worry1 from '../assets/png/worry1.png';
import worry2 from '../assets/png/worry2.png';
import worry3 from '../assets/png/worry3.png';
import styled from 'styled-components';
import {
  MainContainer, GmarketSansMedium, Moon, Image
} from '../assets/styles';
import {
  CenteredText, LeftText, RightText, Section, SectionOne, WorryImageContainer,
  WorryImage1, WorryImage2, WorryImage3, OwnglyphFont, StyledUpButtonContainer, StyledUpImage, StyledUpButtonText,
  Button, InputContainer, StyledInput, StyledButton, FadeOutText, FadeInText
} from '../main/mainstyles';
import RotatingCharacters from './RotatingCharacters';
import StarBackground from '../assets/StarBackground';

const StarField: React.FunctionComponent = () => {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [fadeOutCompleted, setFadeOutCompleted] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [nickname, setNickname] = useState('');
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

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleNicknameSubmit = () => {
    if (nickname.trim()) {
      navigate('/select');
    } else {
      alert('닉네임을 입력해주세요.');
    }
  };

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
                <StyledInput
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
                <StyledButton onClick={handleNicknameSubmit}>
                  <GmarketSansMedium style={{ color: 'white', fontSize: '20px' }}><span>입력</span></GmarketSansMedium>
                </StyledButton>
              </InputContainer>
            </>
          )}
        </SectionOne>
      </Section>

      <Section>
        <StarBackground />
        <CenteredText>
          <OwnglyphFont className="fadeInText">
            <WorryImageContainer>
              <WorryImage1 src={worry1} alt="Worry 1" />
              <WorryImage2 src={worry2} alt="Worry 2" />
              <WorryImage3 src={worry3} alt="Worry 3" />
            </WorryImageContainer>
            <br />
            <br />
            혹시 누군가에게 말 못할 고민이나 쉽게 꺼내기 어려운 이야기가 있으신가요?
          </OwnglyphFont>
        </CenteredText>
      </Section>

      <Section>
        <StarBackground />
        <RotatingCharacters />
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
        <StarBackground />
        <LeftText>
          <OwnglyphFont className="fadeInText">
            가장 편안하고 즐거운 대화 시간을 만들어드릴게요.
            <br />
            <br />
            <br />
            함께 이야기 나누러 가지 않을래요?
          </OwnglyphFont>
        </LeftText>
        <StyledUpButtonContainer onClick={scrollToFirstSection}>
          <StyledUpImage src={upButtonImg} alt="Up" />
          <StyledUpButtonText>이야기하러가기</StyledUpButtonText>
        </StyledUpButtonContainer>
      </Section>
    </MainContainer>
  );
};

export default StarField;
