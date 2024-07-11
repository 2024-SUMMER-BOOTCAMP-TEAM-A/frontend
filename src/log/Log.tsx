import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Image, MainContainer
} from '../assets/styles';
import {
  DownButton, CosultButton, RankingButton, ShareButton, ButtonContainer, GmarketSansMedium,LogArea,
} from './logstyles';
import StarBackground from '../assets/StarBackground';
import personaImg from '../assets/png/persona.png';
import { Button } from 'react-scroll';

const Log: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <MainContainer>
      <StarBackground />
      <ButtonContainer>
        <LogArea/>
        <DownButton>
          <GmarketSansMedium>다운로드</GmarketSansMedium>
        </DownButton>
        <ShareButton>
          <GmarketSansMedium>공유하기</GmarketSansMedium>
        </ShareButton>
        <CosultButton onClick={() => navigate('/select/:nickname')}>
          <GmarketSansMedium>상담하러가기</GmarketSansMedium>
        </CosultButton>
        <RankingButton onClick={() => navigate('/topselect')}>
          <GmarketSansMedium>인기챗봇순위</GmarketSansMedium>
        </RankingButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default Log;
