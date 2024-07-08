import React, { useState } from 'react';
import personaImg from '../assets/png/persona.png';
import styled from 'styled-components';
import {
  MainContainer, GmarketSansMedium, Stars,
  Stars1, Stars2, Moon, Image
} from '../assets/styles';
import {
  CenteredText, Section, SectionOne, OwnglyphFont,
} from '../main/mainstyles';
import {
  RankingButton, TopCenterText, CardContainer, CardSlider, CardImage, CardText, Card,
  NavButton, NavContainer
} from '../select/selectstyles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';

const Select: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    { img: mzImage, text: 'MZ\n\n나를 선택해야 후회 안할걸?' },
    { img: leemalImage, text: '침착맨\n\nㅎㅇㅎㅇ' },
    { img: luckyImage, text: '럭키비키\n\n이것도 완전 럭키잖아!' },
    { img: uncleImage, text: '이웃집 아저씨\n\n야! 나 선택하라고 나!' },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const displayedCards = [
    ...cards.slice(currentIndex, currentIndex + 3),
    ...cards.slice(0, Math.max(0, (currentIndex + 3) - cards.length)),
  ].slice(0, 3);

  return (
    <MainContainer>
      <Stars />
      <Stars1 />
      <Stars2 />
      <ShootingStarsComponent />
      <Image src={personaImg} alt="Persona" />
      <Moon />
      <RankingButton>인기챗봇순위</RankingButton>
      <CardContainer>
        <CardSlider>
          {displayedCards.map((card, index) => (
            <Card key={index}>
              <CardImage src={card.img} alt={`Character ${index + 1}`} />
              <CardText>{card.text}</CardText>
            </Card>
          ))}
        </CardSlider>
      </CardContainer>
      <NavContainer>
        <NavButton onClick={handlePrev}>{'< Prev'}</NavButton>
        <NavButton onClick={handleNext}>{'Next >'}</NavButton>
      </NavContainer>
    </MainContainer>
  );
};

export default Select;