import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { saveUserSelection } from './selectAPI';

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
  { id: 1, name: '침착맨', title: '연애가 젤 쉬운거 아님?' },
  { id: 2, name: '장원영', title: '이거 완전 럭키비키잖아! 🍀 ' },
  { id: 3, name: '이서진', title: '인생은 원래 힘든거야~' },
  { id: 4, name: '맑눈광', title: '이렇게 해야 능률이 올라가는 편입니다.' }
];

const Select: React.FC = () => {
  const [personasData, setPersonasData] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('Access token not found in localStorage');
    }
  }, []);  

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
      return response.data;
    } catch (error) {
      console.error('Error fetching persona details:', error);
      throw error;
    }
  };

  const handleCardClick = async (personaId: number, isActive: boolean) => {
    if (!isActive) return;

    try {
      const details = await fetchPersonaDetails(personaId);

      const cardData = personasData.find((card) => card.id === personaId);
      if (cardData) {
        const updatedCard = { ...cardData, modalText: details.content };
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

  const handleStartChat = async () => {
    if (selectedCard) {
      const { id, name, cardText, modalText, fontComponent } = selectedCard;
  
      try {
        await saveUserSelection(id);
        navigate('/chat', {state: { character: { id, name, cardText, modalText, fontFamily: fontComponent.displayName || 'defaultFont',}}});
      } catch (error) {
        console.error('Error starting chat:', error);
      }
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
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const displayedCards = [
    ...personasData.slice(currentIndex, currentIndex + 3),
    ...personasData.slice(0, Math.max(0, (currentIndex + 3) - personasData.length)),
  ].slice(0, 3);

  const FontComponent = selectedCard?.fontComponent || KyoboHandwriting2020A;

  return (
    <MainContainer>
      <StarBackground />
      <Image src={personaImg} alt="Persona" style={{ width: '30%', height: 'auto' }} />
      <Moon style={{ width: '15%', height: '30%' }} />
      <LogoutButton onClick={() => handleLogout()}>
        <GmarketSansMedium style={{ fontSize: '15px' }}>로그아웃</GmarketSansMedium>
      </LogoutButton>
      <FadeInText>
        <RankingButton onClick={() => navigate('/topselect')}>
          <GmarketSansMedium style={{ fontSize: '15px' }}>인기챗봇순위</GmarketSansMedium>
        </RankingButton>
        <CardContainer>
          <CardSlider $animationDirection={animationDirection}>
            {displayedCards.map((card, index) => (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card.id, index === 1)}
                isActive={index === 1}
                isLeft={index === 0}
                isRight={index === 2}
              >
                <CardImage src={card.img} alt={`Character ${card.name}`} />
                <CardText as={card.fontComponent}>{card.name}</CardText>
                <CardText as={card.fontComponent}>{card.cardText}</CardText>
              </Card>
            ))}
          </CardSlider>
        </CardContainer>
        <NavContainer>
          <NavButton onClick={handlePrev} className="iconamoon--arrow-left-2-bold" />
          <NavButton onClick={handleNext} className="iconamoon--arrow-right-2-bold" />
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
    </MainContainer>
  );
};

export default Select;

