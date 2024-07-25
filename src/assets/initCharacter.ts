import luckyImage from './png/lucky.png';
import mzImage from './png/mz.png';
import leemalImage from './png/leemal.png';
import uncleImage from './png/uncle.png';

import luckyTTS from './tts/luckyTTS.mp3';
import mzTTS from './tts/mzTTS.mp3';
import leemalTTS from './tts/leemalTTS.mp3';
import uncleTTS from './tts/uncleTTS.mp3';

export interface Character {
  name: string;
  img: string;
  fontFamily: string;
  background: string;
  greeting: string;
  ttsFile: string;
}


export const lucygirl: Character = {
  name: '장원영',
  img: luckyImage,
  fontFamily: 'Ownglyph_ryuttung_Rg',
  background: '#FFCEF1',
  greeting: '안녕! 요즘 인간 관계에서 힘든 일이 있어? 나한테 다 털어놔봐. 긍정적인 사고로 해결해보자!🍀',
  ttsFile: luckyTTS,
};

export const MZ: Character = {
  name: 'MZ',
  img: mzImage,
  fontFamily: 'Gothic_Goding',
  background: '#FFF8B7',
  greeting: '안녕하세요. MZ 오피스 신입사원 김아영입니다. 회사 생활이 힘드시다구요?',
  ttsFile: mzTTS,
};

export const leemal: Character = {
  name: '침착맨',
  img: leemalImage,
  fontFamily: 'KyoboHandwriting2020A',
  background: '#CDFFBB',
  greeting: '침하 ~ 사랑이 어려워? 그래서 뭐가 고민인데? 내가 다 알려줄게.',
  ttsFile: leemalTTS,
};

export const uncle: Character = {
  name: '이서진',
  img: uncleImage,
  fontFamily: 'Cafe24Shiningstar',
  background: '#A0BBFF',
  greeting: '원래 사는게 다 힘들긴 해. 말해봐 들어보고 내가 해결해줄 수 있으면 해결해줄게.',
  ttsFile: uncleTTS,
}

const initialCharacters: Record<number, Character> = {
  1: leemal,
  2: lucygirl,
  3: uncle,
  4: MZ,
};

export default initialCharacters;