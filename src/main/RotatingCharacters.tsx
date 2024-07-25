import React from 'react';
import { CharacterContainer, Character1, Character2, Character3, ClickImage } from '../main/mainstyles';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import clickImg from '../assets/png/click.png';
import uncleImg from '../assets/png/uncle.png';
import { lucygirl } from '../assets/initCharacter';

const RotatingCharacters: React.FC = () => {
  return (
    <CharacterContainer>
      <Character1 src={leemalImage} alt="1" />
      <Character2 src={luckyImage} alt="2" />
      <Character3 src={mzImage} alt="3" />
      <ClickImage src={clickImg} alt="Click" />
    </CharacterContainer>
  );
};

export default RotatingCharacters;
