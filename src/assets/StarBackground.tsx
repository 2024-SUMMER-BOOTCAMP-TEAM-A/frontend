import React from 'react';
import styled from 'styled-components';
import { Stars, Stars1, Stars2 } from '../assets/styles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';

const StarBackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
`;

const StarBackground: React.FC = () => {
  return (
    <StarBackgroundContainer>
      <Stars />
      <Stars1 />
      <Stars2 />
      <ShootingStarsComponent />
    </StarBackgroundContainer>
  );
};

export default StarBackground;
