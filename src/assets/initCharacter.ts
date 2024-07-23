import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';

export interface Character {
  name: string;
  img: string;
  fontFamily?: string;
  background?: string;
  greeting?: string;
}


export const lucygirl: Character = {
  name: '장원영',
  img: luckyImage,
  fontFamily: 'Ownglyph_ryuttung_Rg',
  background: '#FFCEF1',
  greeting: '안녕! 요즘 인간 관계에서 힘든 일이 있어? 나한테 다 털어놔봐.',
};

export const MZ: Character = {
  name: '김아영',
  img: mzImage,
  fontFamily: 'Gothic_Goding',
  background: '#FFF8B7',
  greeting: '안녕하세요. MZ 오피스 신입사원 김아영입니다. 회사 생활이 힘드시다구요?',
};

export const leemal: Character = {
  name: '침착맨',
  img: leemalImage,
  fontFamily: 'KyoboHandwriting2020A',
  background: '#CDFFBB',
  greeting: '사랑이 어려워? 그래서 뭐가 고민인데? 내가 다 알려줄게',
};

export const uncle: Character = {
  name: '이서진',
  img: uncleImage,
  fontFamily: 'Cafe24Shiningstar',
  background: '#A0BBFF',
  greeting: '원래 사는게 다 힘들긴 해. 들어보고 내가 해결해줄 수 있으면 해결해줄게.',

}

const initialCharacters: Record<number, Character> = {
  1: leemal,
  2: lucygirl,
  3: uncle,
  4: MZ,
};

export default initialCharacters;