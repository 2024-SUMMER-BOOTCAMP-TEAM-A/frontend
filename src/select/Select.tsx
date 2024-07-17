import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import personaImg from '../assets/png/persona.png';
import mzBackground from '../assets/png/mzback.png';
import leemalBackground from '../assets/png/leemalback.png';
import luckyBackground from '../assets/png/luckyback.png';
import uncleBackground from '../assets/png/uncleback.png';
import {
  GmarketSansMedium, Moon, Image, Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar,
} from '../assets/styles';
import {
  CardContainer, CardSlider, CardImage, CardText, Card, FadeInText,
  NavButton, NavContainer, MainContainer, ModalStyles, ModalContent, RankingButton, ChatButton
} from '../select/selectstyles';
import StarBackground from '../assets/StarBackground';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';
import { fetchPersonas } from './selectAPI';
import { fetchPersonaDetails } from './selectmodalAPI';

interface CardData {
  id: string;
  img: string;
  name: string;
  cardText: string;
  modalText: string;
  background: string;
  fontComponent: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }>;
}

const Select: React.FC = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPersonas = async () => {
      try {
        const personas = await fetchPersonas();
        const newCards = personas.map(persona => ({
          id: persona.id,
          img: getImageByName(persona.name),
          name: persona.name,
          cardText: `${persona.name}\n\n${persona.title}`,
          modalText: '', // 나중에 fetchPersonaDetails로 채워질 것입니다.
          background: getBackgroundByName(persona.name),
          fontComponent: getFontComponentByName(persona.name),
        }));
        console.log('New Cards:', newCards); // 새로운 카드 배열을 로그에 출력
        setCards(newCards);
      } catch (error) {
        console.error('인격 카드 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    loadPersonas();
  }, []);

  const getImageByName = (name: string) => {
    switch (name) {
      case '김아영':
        return mzImage;
      case '침착맨':
        return leemalImage;
      case '장원영':
        return luckyImage;
      case '쌈디':
        return uncleImage;
      default:
        return '';
    }
  };

  const getBackgroundByName = (name: string) => {
    switch (name) {
      case '김아영':
        return mzBackground;
      case '침착맨':
        return leemalBackground;
      case '장원영':
        return luckyBackground;
      case '쌈디':
        return uncleBackground;
      default:
        return '';
    }
  };

  const getFontComponentByName = (name: string) => {
    switch (name) {
      case '김아영':
        return Gothic_Goding;
      case '침착맨':
        return KyoboHandwriting2020A;
      case '장원영':
        return Ownglyph_ryuttung_Rg;
      case '쌈디':
        return Cafe24Shiningstar;
      default:
        return GmarketSansMedium;
    }
  };

  const handlePrev = () => {
    setAnimationDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
      setAnimationDirection(null);
    }, 100);
  };

  const handleNext = () => {
    setAnimationDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
      setAnimationDirection(null);
    }, 100);
  };

  const handleCardClick = async (card: CardData) => {
    try {
      const details = await fetchPersonaDetails(card.id);
      setSelectedCard({ ...card, modalText: details.title });
      setModalIsOpen(true);
    } catch (error) {
      console.error('캐릭터 세부 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedCard(null);
  };

  const handleStartChat = () => {
    if (selectedCard) {
      console.log('Navigating to chat with nickname:', nickname);
      console.log('Selected card:', selectedCard);
      const { img, name, cardText, modalText, background, fontComponent } = selectedCard;
      navigate(`/chat/${nickname}`, { state: { character: { img, name, cardText, modalText, background, fontFamily: fontComponent.displayName || 'defaultFont' } } });
    }
  };

  const displayedCards = [
    ...cards.slice(currentIndex, currentIndex + 3),
    ...cards.slice(0, Math.max(0, (currentIndex + 3) - cards.length)),
  ].slice(0, 3);

  console.log('Displayed Cards:', displayedCards); // 표시되는 카드 배열을 로그에 출력

  return (
    <MainContainer>
      <StarBackground />
      <Image src={personaImg} alt="Persona" style={{ width: '30%', height: 'auto' }} />
      <Moon style={{ width: '15%', height: '30%' }} />
      <FadeInText>
        <RankingButton onClick={() => navigate(`/topselect/${nickname}`)}>
          <GmarketSansMedium style={{ fontSize: '15px' }}>인기챗봇순위</GmarketSansMedium>
        </RankingButton>
        <CardContainer>
          <CardSlider $animationDirection={animationDirection}>
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
      </FadeInText>
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
          <ModalContent style={{ position: 'relative', right: '10%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={selectedCard.img}
                alt="Selected Character"
                style={{ width: '250px', height: 'auto', borderRadius: '50%', marginBottom: '10px' }}
              />
              <selectedCard.fontComponent style={{ fontSize: '40px', color: 'black', marginBottom: '20px', marginTop: '30px', marginLeft: '-6px' }}>
                {selectedCard.name}
              </selectedCard.fontComponent>
            </div>
            <div style={{ textAlign: 'left', width: '100%', marginLeft: '-200px' }}>
              <selectedCard.fontComponent style={{ fontSize: '35px', color: 'black', marginBottom: '20px' }}>
                {selectedCard.modalText}
              </selectedCard.fontComponent>
              <ChatButton onClick={handleStartChat}>
                <GmarketSansMedium style={{ fontSize: '17px' }}>채팅 시작하기</GmarketSansMedium>
              </ChatButton>
            </div>
          </ModalContent>
        )}
      </ReactModal>
      {nickname && <div>Welcome, {nickname}!</div>}
    </MainContainer>
  );
};

export default Select;
