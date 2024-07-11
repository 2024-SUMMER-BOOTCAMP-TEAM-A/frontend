import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GmarketSansMedium, Moon, Image, Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar,MainContainer
  } from '../assets/styles';
import StarBackground from '../assets/StarBackground';
import personaImg from '../assets/png/persona.png';

const Log: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <MainContainer>
      <StarBackground />
    </MainContainer>
  );
}

export default Log;
