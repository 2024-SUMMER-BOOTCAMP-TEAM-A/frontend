import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';

export interface Character {
  name: string;
  imageSrc: string;
  FontFamily?: string;
  chatContentBackgroundColor?: string;
}

export const lucygirl: Character = {
  name: '럭키비키걸',
  imageSrc: luckyImage,
  FontFamily:'sans-serif',
  chatContentBackgroundColor: '#FFF8B7',
};

export const MZ: Character = {
  name: '맑눈광',
  imageSrc: mzImage,
  chatContentBackgroundColor: '#fsd3B7',
};

export const leemal: Character = {
  name: '침착맨',
  imageSrc: leemalImage,
  chatContentBackgroundColor: 'sgeFB7',
};

export const love: Character = {
  name: '쌈디',
  imageSrc: leemalImage,
  chatContentBackgroundColor: '#FFF8B7',
}

const initialCharacters = { lucygirl, MZ, leemal, love};

export default initialCharacters;