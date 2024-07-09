import React from 'react';
import ReactModal from 'react-modal';
import personaImg from '../assets/png/persona.png';
import {
  GmarketSansMedium, Moon, Image, EF_jejudoldam, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg,
} from '../assets/styles';
import { MainContainer, FadeInText } from './topselectstyles';
import StarBackground from '../assets/StarBackground';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';

const TopSelect: React.FC = () => {
    return(
        <>
        <MainContainer>
            <StarBackground/>
            <Image src={personaImg} alt="Persona" />
            <Moon/>
        </MainContainer>
        </>
    );
}

export default TopSelect;