import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainContainer, BackButton, Display, CharacterContainer, FirstPlaceContainer, OtherPlacesContainer, FirstPlaceImage, OtherPlaceImage, FirstPlaceComment
} from './topselectstyles';
import {
  GmarketSansMedium, Moon, Image, Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar,
} from '../assets/styles';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';
import personaImg from '../assets/png/persona.png';
import StarBackground from '../assets/StarBackground';
import BarChart from './BarChart';

const TopSelect: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const firstPlaceComment = (character: string) => {
    const commonStyle = { fontSize: '25px' };

    switch (character) {
      case '장원영':
        return <Ownglyph_ryuttung_Rg style={commonStyle}>내가 1등이라고?! 완전 럭키비키잖아~</Ownglyph_ryuttung_Rg>;
      case '김아영':
        return <Gothic_Goding style={commonStyle}>제가 1등이네요</Gothic_Goding>;
      case '쌈디':
        return <Cafe24Shiningstar style={commonStyle}>역시 내가 1등이데이</Cafe24Shiningstar>;
      case '침착맨':
        return <KyoboHandwriting2020A style={commonStyle}>ㅋㅋㅋㅋㅋ</KyoboHandwriting2020A>;
      default:
        return '';
    }
  };

  const voteData = {
    '장원영': 40,
    '쌈디': 30,
    '침착맨': 20,
    '김아영': 10,
  };

  return (
    <MainContainer>
      <StarBackground />
      <Image src={personaImg} alt="Persona" style={{ width: '30%', height: 'auto' }}/>
      <Moon style={{ width: '15%', height: '30%' }} />
      <Display>
        <CharacterContainer>
          <FirstPlaceContainer>
            <FirstPlaceImage src={luckyImage} alt="장원영" />
            <FirstPlaceComment>{firstPlaceComment('장원영')}</FirstPlaceComment>
          </FirstPlaceContainer>
          <OtherPlacesContainer>
            <OtherPlaceImage src={mzImage} alt="쌈디" />
            <OtherPlaceImage src={leemalImage} alt="침착맨" />
            <OtherPlaceImage src={uncleImage} alt="김아영" />
          </OtherPlacesContainer>
        </CharacterContainer>
        <BarChart data={voteData} width="60%" height="80vh" />
      </Display>
      <BackButton onClick={handleBackClick} />
    </MainContainer>
  );
};

export default TopSelect;
