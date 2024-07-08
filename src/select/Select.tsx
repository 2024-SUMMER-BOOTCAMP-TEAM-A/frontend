import React, { useState } from 'react';
import ReactModal from 'react-modal';
import personaImg from '../assets/png/persona.png';
import mzBackground from '../assets/png/mzback.png';
import leemalBackground from '../assets/png/leemalback.png';
import luckyBackground from '../assets/png/luckyback.png';
import uncleBackground from '../assets/png/uncleback.png';
import styled from 'styled-components';
import {
  GmarketSansMedium, Moon, Image, EF_jejudoldam, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg,
} from '../assets/styles';
import {
  RankingButton, CardContainer, CardSlider, CardImage, CardText, Card,
  NavButton, NavContainer, MainContainer, ModalStyles, ModalContent, NameText,
} from '../select/selectstyles';
import StarBackground from '../assets/StarBackground';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';

interface CardData {
  img: string;
  name: string;
  cardText: string;
  modalText: string;
  background: string;
  fontComponent: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }>;
}

const Select: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const cards: CardData[] = [
    {
      img: mzImage,
      name: '김아영',
      cardText: '김아영\n\n이렇게 해야\n능률이 올라가는 편입니다',
      modalText: '열심히 하(는 척 하겠)습니다! 아… 제 귀에 있는 에어팟을 빼라고요…? 저는 에어팟을 껴야 능률이 오르는 편입니다만. 제 권리를 빼앗지 말아주세요. 아… 고민이 있다고요…? 시간은 없지만 돈은 벌어야 하니 한 번 들어드릴게요. 어떤 고민이 있으세요?',
      background: mzBackground,
      fontComponent: EF_jejudoldam,
    },
    {
      img: leemalImage,
      name: '침착맨',
      cardText: '침착맨\n\n나랑 스무고개해서 이기면 만원ㅋ',
      modalText: '침하! 오늘 아저씨랑 스무고개 하자. 내가 어떤 단어를 낼지는 아무도 모르는 거 알지? 뭐? 너무 뻔하다고? 열받네 경고 1회 드립니다. 예측 불가능한 단어로만 골라줄게. 병건하게 바로 들어가자.',
      background: leemalBackground,
      fontComponent: KyoboHandwriting2020A,
    },
    {
      img: luckyImage,
      name: '장원영',
      cardText: '장원영\n\n이거 완전 럭키비키잖아!',
      modalText: '내가 연습끝나고 딱 물을 먹으려고 했는데 글쎄 물이 딱 반정도 남은거야! 다 먹기엔 너무 많고 덜 먹기엔 너무 적고 그래서 딱 반만 있었으면 좋겠다고 생각했는데 완전 럭키비키잖아 근데 고민이 있다고? 나한테 말해봐~',
      background: luckyBackground,
      fontComponent: Ownglyph_ryuttung_Rg,
    },
    {
      img: uncleImage,
      name: '쌈디',
      cardText: '쌈디\n\n연애가 참 어렵제?',
      modalText: '나도 연애가 어려웠다. 연애는 최선을 다 해야되는 기다. 최선을 다해야 후회가 없는 법이다. 시작부터 보이지 않는 끝까지 길찾기 쉽도록 내가 가이드 라인을 알려줄라칸다. 사랑 때문에 고민있는 머스마 가시나 다 따라와라. 사랑이 뭐라고 그리 고민하노!',
      background: uncleBackground,
      fontComponent: KyoboHandwriting2020A,
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedCard(null);
  };

  const displayedCards = [
    ...cards.slice(currentIndex, currentIndex + 3),
    ...cards.slice(0, Math.max(0, (currentIndex + 3) - cards.length)),
  ].slice(0, 3);

  return (
    <MainContainer>
      <StarBackground />
      <Image src={personaImg} alt="Persona" />
      <Moon />
      <RankingButton>
        <GmarketSansMedium style={{ fontSize: '15px' }}>인기챗봇순위</GmarketSansMedium>
      </RankingButton>
      <CardContainer>
        <CardSlider>
          {displayedCards.map((card, index) => {
            const FontComponent = card.fontComponent;
            return (
              <Card key={index} onClick={() => handleCardClick(card)}>
                <CardImage src={card.img} alt={`Character ${index + 1}`} />
                <CardText as={FontComponent}>{card.cardText}</CardText>
              </Card>
            );
          })}
        </CardSlider>
      </CardContainer>
      <NavContainer>
        <NavButton onClick={handlePrev}>{'< Prev'}</NavButton>
        <NavButton onClick={handleNext}>{'Next >'}</NavButton>
      </NavContainer>
      <ReactModal 
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={{
            ...ModalStyles,
            content: {
                ...ModalStyles.content,
                backgroundImage: `url(${selectedCard?.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
            }
        }}
        ariaHideApp={false} 
    >
        {selectedCard && (
            <ModalContent>
                <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
                    <img 
                        src={selectedCard.img} 
                        alt="Selected Character" 
                        style={{ width: '200px', height: 'auto', borderRadius: '50%', marginBottom: '10px' }} 
                    />
                    <selectedCard.fontComponent style={{ fontSize: '40px', color: 'black' }}>{selectedCard.name}</selectedCard.fontComponent>
                </div>
                <div style={{ flex: '1', marginLeft: '50px', textAlign: 'left' }}>
                    <selectedCard.fontComponent style={{ fontSize: '30px', color: 'black' }}>
                      {selectedCard.modalText}
                    </selectedCard.fontComponent>
                    <button 
                        onClick={handleCloseModal} 
                        style={{ 
                            marginTop: '20px', 
                            padding: '10px 60px', 
                            borderRadius: '40px', 
                            background: '#CBC3E3', 
                            border: 'none', 
                            cursor: 'pointer',
                        }}
                    >
                        <GmarketSansMedium style={{ fontSize: '17px' }}>채팅 시작하기</GmarketSansMedium>
                    </button>
                </div>
            </ModalContent>
          )}
       </ReactModal>
    </MainContainer>
  );
};

export default Select;
