import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';
import axios from 'axios'; 
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

const API_URL = 'http://localhost:8000/api/v1/persons';

interface Persona {
  id: number;
  name: string;
  title: string;
}

interface PersonaDetails {
  id: number;
  name: string;
  content: string;
}

interface CardData {
  id: number;
  name: string;
  cardText: string;
  modalText: string;
  img: string;
  background: string;
  fontComponent: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }>;
}

const personas: Persona[] = [
  { id: 1, name: '침착맨',title: '나랑 스무고개해서 이기면 만원'},
  { id: 2, name: '장원영' ,title: '이거 완전 럭키비키잖아! 🍀 '},
  { id: 3, name: '쌈디' , title: '연애가 참 어렵제?'},
  { id: 4, name: '맑눈광',title: '이렇게 해야 능률이 올라가는 편입니다.' }
];

const Select: React.FC = () => {
  const location = useLocation();
  const { nickname } = location.state || {};
  const [personasData, setPersonasData] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const formattedData = personas.map((persona, index) => {
      const images = [leemalImage, luckyImage, uncleImage, mzImage];
      const backgrounds = [leemalBackground, luckyBackground, uncleBackground, mzBackground];
      const fonts = [KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar, Gothic_Goding];
  
      return {
        id: persona.id,
        name: persona.name,
        cardText: persona.title, 
        modalText: '',
        img: images[index % images.length],
        background: backgrounds[index % backgrounds.length],
        fontComponent: fonts[index % fonts.length],
      };
    });
  
    setPersonasData(formattedData);
  }, []);

  const fetchPersonaDetails = async (personaId: number): Promise<PersonaDetails> => {
    try {
      const response = await axios.get<PersonaDetails>(`${API_URL}/${personaId}`);
      console.log('API Response for Details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching persona details:', error);
      throw error;
    }
  };

  const handleCardClick = async (personaId: number) => {
    console.log("Clicked Persona ID:", personaId);

    try {
      const details = await fetchPersonaDetails(personaId);
      console.log('Fetched details:', details);

      const cardData = personasData.find((card) => card.id === personaId);
      if (cardData) {
        const updatedCard = { ...cardData, modalText: details.content };
        console.log("Selected Card Data:", updatedCard);
        setSelectedCard(updatedCard);
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error fetching persona details:', error);
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
      navigate('/chat', { state: { character: { name, cardText, modalText, fontFamily: fontComponent.displayName || 'defaultFont' }, nickname } });
    }
  };

  const handlePrev = () => {
    setAnimationDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? personasData.length - 1 : prev - 1));
      setAnimationDirection(null);
    }, 100);
  };

  const handleNext = () => {
    setAnimationDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === personasData.length - 1 ? 0 : prev + 1));
      setAnimationDirection(null);
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰을 로컬 저장소에서 제거
    navigate('/'); // 로그인 페이지로 리디렉션
  };
  

  const displayedCards = [
    ...personasData.slice(currentIndex, currentIndex + 3),
    ...personasData.slice(0, Math.max(0, (currentIndex + 3) - personasData.length)),
  ].slice(0, 3);

  const FontComponent = selectedCard?.fontComponent || KyoboHandwriting2020A; // Default font component

  return (
    <MainContainer>
      <StarBackground />
      <Image src={personaImg} alt="Persona" style={{ width: '30%', height: 'auto' }} />
      <Moon style={{ width: '15%', height: '30%' }} />
      <LogoutButton onClick={() => handleLogout()}>
        <GmarketSansMedium style={{ fontSize: '15px' }}>로그아웃</GmarketSansMedium>
      </LogoutButton>
      <FadeInText>
        <RankingButton onClick={() => navigate('/topselect', { state: { nickname } })}>
          <GmarketSansMedium style={{ fontSize: '15px' }}>인기챗봇순위</GmarketSansMedium>
        </RankingButton>
        <CardContainer>
          <CardSlider $animationDirection={animationDirection}>
            {displayedCards.map((card) => (
              <Card key={card.id} onClick={() => handleCardClick(card.id)}>
                <CardImage src={card.img} alt={`Character ${card.name}`} />
                <CardText as={card.fontComponent}>{card.name}</CardText>
                <CardText as={card.fontComponent}>{card.cardText}</CardText>
              </Card>
            ))}
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
              <div>
                <img src={selectedCard.img} alt={`Character ${selectedCard.name}`} style={{ width: '200px', height: '300px', borderRadius: '50%' }} />
              </div>
              <div style={{ marginBottom: '20px', marginTop: '30px', marginLeft: '-6px' }}>
                <selectedCard.fontComponent style={{ fontSize: '40px', color: 'black' }}>
                  {selectedCard.name}
                </selectedCard.fontComponent>
              </div>
            </div>
            <div style={{ textAlign: 'left', width: '100%', marginLeft: '-200px' }}>
              <FontComponent style={{ fontSize: '35px', color: 'black', marginBottom: '20px' }}>
                {selectedCard.modalText}
              </FontComponent>
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
