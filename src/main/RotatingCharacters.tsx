import React from 'react';
import { CharacterContainer, Character1, Character2, Character3, ClickImage } from '../main/mainstyles';
import luckyImage from '../assets/lucky.png';
import mzImage from '../assets/mz.png';
import leemalImage from '../assets/leemal.png';
import clickImg from '../assets/click.png';

const RotatingCharacters: React.FC = () => {
  return (
    <CharacterContainer>
      <Character1 src={luckyImage} alt="Character 1" />
      <Character2 src={mzImage} alt="Character 2" />
      <Character3 src={leemalImage} alt="Character 3" />
      <ClickImage src={clickImg} alt="Click" />
    </CharacterContainer>
  );
};

export default RotatingCharacters;
