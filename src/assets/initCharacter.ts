import { CSSProperties } from 'react';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';

interface CharacterStyles {
  imageSrc: string;
  bubbleStyle: CSSProperties;
  fontStyle: CSSProperties;
}

export const initialCharacter: Record<string, CharacterStyles> = {
  '럭키비키걸': {
    imageSrc: luckyImage,
    bubbleStyle: { backgroundColor: '#FFDDC1'},
    fontStyle: { fontFamily: 'Comic Sans MS' }
  },
  '맑눈광' : {
    imageSrc: mzImage,
    bubbleStyle: {backgroundColor: '#asd232'},
    fontStyle: { fontFamily: 'monospace' }
  },
  '침착맨' : {
    imageSrc: leemalImage,
    bubbleStyle: {backgroundColor: '#19ds32'},
    fontStyle: { fontFamily: 'serif' }
  }
};