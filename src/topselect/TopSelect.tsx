import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainContainer, BackButton, Display, CharacterContainer, CharacterImage
} from './topselectstyles';
import {
    GmarketSansMedium, Moon, Image, Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar,
  } from '../assets/styles';
import StarBackground from '../assets/StarBackground';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';
import personaImg from '../assets/png/persona.png';

const TopSelect: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <MainContainer>
      <StarBackground />
      <Image src={personaImg} alt="Persona" style={{ width: '30%', height: 'auto' }}/>
      <Moon style={{ width: '300px', height: '300px' }} />
      <Display>
        <CharacterContainer>
          <h1>인기 챗봇 순위</h1>
          <CharacterImage src={luckyImage} alt="Character 1" />
          <CharacterImage src={mzImage} alt="Character 2" />
          <CharacterImage src={uncleImage} alt="Character 3" />
          <CharacterImage src={leemalImage} alt="Character 4" />
        </CharacterContainer>
      </Display>
      <BackButton onClick={handleBackClick} />
    </MainContainer>
  );
}

export default TopSelect;
