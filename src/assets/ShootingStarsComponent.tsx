import React, { useEffect, useState } from 'react';
import { ShootingStars } from './styles';

const ShootingStarsComponent: React.FunctionComponent = () => {
    const [shootingStars, setShootingStars] = useState<JSX.Element[]>([]);
  
    useEffect(() => {
      const generateShootingStars = () => {
        const numberOfStars = Math.random() < 0.5 ? 1 : 2;
        const newShootingStars = Array.from({ length: numberOfStars }, (_, index) => (
          <ShootingStars 
            key={index} 
            $top={Math.random() * window.innerHeight} 
            $left={Math.random() * window.innerWidth} 
          />
        ));
        setShootingStars(newShootingStars);
      };
  
      const interval = setInterval(generateShootingStars, 3000);
  
      // 초기 별똥별 생성
      generateShootingStars();
  
      return () => clearInterval(interval);
    }, []);
    
  return <>{shootingStars}</>;
};

export default ShootingStarsComponent;
