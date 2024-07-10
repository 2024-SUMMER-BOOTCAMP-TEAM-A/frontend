import React, { useEffect, useState } from 'react';
import { ShootingStars } from './styles';

const ShootingStarsComponent: React.FunctionComponent = () => {
    const [shootingStars, setShootingStars] = useState<JSX.Element[]>([]);
  
    useEffect(() => {
      const generateShootingStars = () => {
        const numberOfStars = Math.random() < 0.5 ? 1 : 2;
        const newShootingStars = Array.from({ length: numberOfStars }, (_, index) => {
          //const id = `star-${Date.now()}-${index}`; // 유니크 키 생성
          return (
            <ShootingStars 
              key={index} 
              top={Math.random() * 100} 
              left={Math.random() * 2560} 
            />
          );
        });
        setShootingStars(newShootingStars);
      };
  
      const interval = setInterval(generateShootingStars, 3000);
  
      // 초기 별똥별 생성
      //generateShootingStars();
  
      return () => clearInterval(interval);
    }, []);
    
    return <>{shootingStars}</>;
};

export default ShootingStarsComponent;
