import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import personaImg from '../assets/png/persona.png';
import {
  MainContainer, BackButton, BookContainer, BookCover,
} from './topselectstyles';
import {
  GmarketSansMedium, Moon, Image, Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar, 
} from '../assets/styles';
import StarBackground from '../assets/StarBackground';

const TopSelect: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <MainContainer>
            <StarBackground />
            <Image src={personaImg} alt="Persona" style={{ width: '30%', height: 'auto' }}/>
            <Moon style={{ width: '300px', height: '300px' }} />
            <BackButton onClick={handleBackClick} />
            <BookContainer>
                <BookCover isOpen={isOpen} />
             </BookContainer>
        </MainContainer>
    );
}

export default TopSelect;
