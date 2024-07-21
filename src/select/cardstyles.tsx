import styled, { keyframes, css } from 'styled-components';

const slideDuration = '0.7s';
const appearDuration = '0.7s';

const slideLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-33.33%);
  }
`;

const slideRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(33.33%);
  }
`;


const appearFromLeft = keyframes`
  0% {
    transform: translateX(33.33%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const appearFromRight = keyframes`
  0% {
    transform: translateX(-33.33%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;


const tiltLeft = keyframes`
  from {
    transform: perspective(1000px) rotateY(0);
  }
  to {
    transform: perspective(1000px) rotateY(15deg);
  }
`;

const tiltRight = keyframes`
  from {
    transform: perspective(1000px) rotateY(0);
  }
  to {
    transform: perspective(1000px) rotateY(-15deg);
  }
`;

const rotateAndZoom = keyframes`
  from {
    transform: rotateY(0) scale(1);
  }
  to {
    transform: rotateY(180deg) scale(1.5);
  }
`;

const rotateBackAndZoom = keyframes`
  from {
    transform: rotateY(180deg) scale(1.5);
  }
  to {
    transform: rotateY(0) scale(1);
  }
`;

interface CardSliderProps {
  $animationDirection?: 'left' | 'right' | null;
}

export const CardSlider = styled.div<CardSliderProps>`
  display: flex;
  width: 300%;
  position: relative; /* Add this line */
  ${({ $animationDirection }) =>
    $animationDirection === 'left' &&
    css`
      animation: ${slideLeft} ${slideDuration} ease-in-out forwards;
    `}
  ${({ $animationDirection }) =>
    $animationDirection === 'right' &&
    css`
      animation: ${slideRight} ${slideDuration} ease-in-out forwards;
    `}
`;

export const Card = styled.div<{
  isActive?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  isAppearingLeft?: boolean;
  isAppearingRight?: boolean;
  isClicked?: boolean;
  isClosing?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(32, 27, 70, 0.7);
  border: 2px solid white;
  border-radius: 40px;
  width: 40%;
  height: 550px;
  margin: 0 50px;
  text-align: center;
  padding: 20px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform ${slideDuration} ease-in-out, opacity ${slideDuration} ease-in-out; /* Add opacity transition */
  backface-visibility: hidden;
  opacity: ${({ isAppearingLeft, isAppearingRight }) => (isAppearingLeft || isAppearingRight ? 0 : 1)}; /* Adjust initial opacity */

  ${({ isActive, isLeft, isRight, isAppearingLeft, isAppearingRight, isClicked, isClosing }) =>
    isActive
      ? css`
          transform: scale(1.1) rotateY(0);
          z-index: 10;
        `
      : isLeft
      ? css`
          animation: ${tiltLeft} ${slideDuration} ease-in-out forwards;
          z-index: 1;
        `
      : isRight
      ? css`
          animation: ${tiltRight} ${slideDuration} ease-in-out forwards;
          z-index: 1;
        `
      : css`
          transform: scale(1) rotateY(0);
          z-index: 1;
        `}

  ${({ isAppearingLeft }) =>
    isAppearingLeft &&
    css`
      animation: ${appearFromLeft} ${appearDuration} ease-in-out forwards;
    `}

  ${({ isAppearingRight }) =>
    isAppearingRight &&
    css`
      animation: ${appearFromRight} ${appearDuration} ease-in-out forwards;
    `}

  ${({ isClicked }) =>
    isClicked &&
    css`
      animation: ${rotateAndZoom} ${appearDuration} ease-in-out forwards;
    `}

  ${({ isClosing }) =>
    isClosing &&
    css`
      animation: ${rotateBackAndZoom} ${appearDuration} ease-in-out forwards;
    `}

  @media screen and (max-width: 768px) {
    width: 80%;
    height: 300px;
    margin: 0 10px;
    padding: 10px;
  }
`;

export const CardImage = styled.img`
  display: flex;
  width: 230px;
  height: 300px;
  border-radius: 50%;
  margin: 20px auto 20px auto;
  backface-visibility: hidden;
  @media screen and (max-width: 768px) {
    width: 150px;
    height: 200px;
  }
`;

export const CardText = styled.div`
  color: white;
  font-size: 28px;
  margin-top: 40px;
  white-space: pre-line;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  backface-visibility: hidden;
  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin-top: 10px;
  }
`;
