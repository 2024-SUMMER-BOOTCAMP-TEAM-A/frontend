import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchPersonas } from './selectAPI';
import { fetchPersonaDetails } from './selectmodalAPI';
import personaImg from '../assets/png/persona.png';
import mzBackground from '../assets/png/mzback.png';
import leemalBackground from '../assets/png/leemalback.png';
import luckyBackground from '../assets/png/luckyback.png';
import uncleBackground from '../assets/png/uncleback.png';
import {
  GmarketSansMedium, Moon, Image, Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar, LogoutButton
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

interface CardData {
  id: string;
  name: string;
  cardText: string;
  modalText: string;
  img: string;
  background: string;
  fontComponent: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }>;
}

const Select: React.FC = () => {
  const { nickname } = useParams<{ nickname: string }>(); // nickname 받아오기
  const [personas, setPersonas] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPersonas = async () => {
      try {
        const data = await fetchPersonas();
        console.log('Fetched personas:', data); // Fetch된 데이터를 로그에 출력
        const formattedData = data.map((persona, index) => {
          // 임시 데이터 설정 (예시)
          const images = [mzImage, leemalImage, luckyImage, uncleImage];
          const backgrounds = [mzBackground, leemalBackground, luckyBackground, uncleBackground];
          const fonts = [Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar];

          return {
            ...persona,
            cardText: persona.title,
            modalText: '',
            img: images[index % images.length],
            background: backgrounds[index % backgrounds.length],
            fontComponent: fonts[index % fonts.length],
          };
        });
        setPersonas(formattedData);
      } catch (error) {
        console.error('인격 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    loadPersonas();
  }, []);

  const handlePrev = () => {
    setAnimationDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? personas.length - 1 : prev - 1));
      setAnimationDirection(null);
    }, 100);
  };

  const handleNext = () => {
    setAnimationDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === personas.length - 1 ? 0 : prev + 1));
      setAnimationDirection(null);
    }, 100);
  };

  const handleCardClick = async (personaId: string) => {
    try {
      const details = await fetchPersonaDetails(personaId);
      const cardData = personas.find((card) => card.id === personaId);
      if (cardData) {
        setSelectedCard({ ...cardData, modalText: details.title });
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('모달 데이터를 불러오는 중 오류 발생:', error);
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
      const { name, cardText, modalText, fontComponent } = selectedCard;
      navigate(`/chat/${nickname}`, { state: { character: { name, cardText, modalText, fontFamily: fontComponent.displayName || 'defaultFont' } } });
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰을 로컬 저장소에서 제거
    navigate('/'); // 로그인 페이지로 리디렉션
  };
  
  const displayedCards = [
    ...personas.slice(currentIndex, currentIndex + 3),
    ...personas.slice(0, Math.max(0, (currentIndex + 3) - personas.length)),
  ].slice(0, 3);

  return (
    <MainContainer>
      <StarBackground />
      <Image src={personaImg} alt="Persona" style={{ width: '30%', height: 'auto' }} />
      <Moon style={{ width: '15%', height: '30%' }} />
      <LogoutButton onClick={handleLogout}>
        <GmarketSansMedium style={{ fontSize: '15px' }}>로그아웃</GmarketSansMedium>
      </LogoutButton>
      <FadeInText>
        <RankingButton onClick={() => navigate(`/topselect/${nickname}`)}>
          <GmarketSansMedium style={{ fontSize: '15px' }}>인기챗봇순위</GmarketSansMedium>
        </RankingButton>
        <CardContainer>
          <CardSlider animationDirection={animationDirection}>
            {displayedCards.map((card, index) => {
              const FontComponent = card.fontComponent;
              return (
                <Card key={index} onClick={() => handleCardClick(card.id)}>
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
