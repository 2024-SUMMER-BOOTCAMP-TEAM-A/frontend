import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';
export interface Character {
  name: string;
  img: string;
  fontFamily?: string;
  background?: string;
}


export const lucygirl: Character = {
  name: '장원영',
  img: luckyImage,
  fontFamily: 'Ownglyph_ryuttung_Rg',
  background: '#FFF8B7',
};

export const MZ: Character = {
  name: '김아영',
  img: mzImage,
  fontFamily: 'Gothic_Goding',
  background: '#fsd3B7',
};

export const leemal: Character = {
  name: '침착맨',
  img: leemalImage,
  fontFamily: 'KyoboHandwriting2020A',
  background: '#sgeFB7',
};

export const uncle: Character = {
  name: '쌈디',
  img: uncleImage,
  fontFamily: 'Cafe24Shiningstar',
  background: '#FFF8B7',
}

const initialCharacters = { lucygirl, MZ, leemal, uncle };

export default initialCharacters;
