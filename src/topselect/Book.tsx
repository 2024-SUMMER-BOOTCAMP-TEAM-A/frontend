import styled from 'styled-components';
import React, { useState } from 'react';

const brown = '#60584A';
const lightBrown = '#D5D6BC';
const white = '#FFFFFF';

const OuterBookContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 650px;
  height: 620px;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 2s ease;
  ${({ isOpen }) => !isOpen && 'transform: translate(-50%, -50%) scale(0.5);'}
`;

const BookCover = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: -2%;
  left: 155%;
  transform: translate(-50%, -50%);
  width: 1400px;
  height: 700px;
  background: ${brown};
  border-radius: 10px;
  transform-origin: left;
  transition: transform 1s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)')};
  z-index: 19; 
`;

const PagesContainer = styled.div<{ isVisible: boolean }>`
  background: ${lightBrown};
  top: 3%;
  left: -50%;
  width: 1300px;
  height: 600px;
  box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.3);
  position: relative;
  transform-style: preserve-3d;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 1s ease;
  backface-visibility: hidden;
  z-index: 20;
`;

const Page = styled.div`
  position: absolute;
  height: inherit;
  width: 50%;
  padding: 1em;
  font: 400 1em / 1.2 'Gentium Book Basic';
`;

const FrontPage = styled(Page)`
  background: linear-gradient(to right, ${brown}, ${lightBrown} 20%, ${white} 100%);
  margin-left: 50%;
`;

const BackPage = styled(Page)`
  background: linear-gradient(to left, ${brown}, ${lightBrown} 20%, ${white} 100%);
`;

export const Book: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPages, setShowPages] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen); 


    setTimeout(() => {
      setShowPages(true);
    }, 1800);
  };

  return (
    <OuterBookContainer isOpen={isOpen} onClick={handleClick}>
      <BookCover isOpen={isOpen} />
      <PagesContainer isVisible={showPages}>
        <BackPage />
        <FrontPage />
      </PagesContainer>
    </OuterBookContainer>
  );
};

export default Book;
