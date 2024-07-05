// 온보딩 3페이지 부분
import React from 'react';
import { CharacterContainer, Character1, Character2, Character3, ClickImage } from '../main/mainstyles';
import uncleImage from '../assets/uncle.png';
import luckyImage from '../assets/lucky.png';
import mzImage from '../assets/mz.png';
import clickImg from '../assets/click.png';

const RotatingCharacters: React.FC = () => {
  return (
    <CharacterContainer>
      <Character1 src={uncleImage} alt="Character 1" />
      <Character2 src={luckyImage} alt="Character 2" />
      <Character3 src={mzImage} alt="Character 3" />
      <ClickImage src={clickImg} alt="Click" />
    </CharacterContainer>
  );
};

export default RotatingCharacters;