// import React from 'react';
// import styled from 'styled-components';
// import { Stars, Stars1, Stars2 } from '../assets/styles';
// import ShootingStarsComponent from '../assets/ShootingStarsComponent';

// const StarBackgroundContainer = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   z-index: 0;
//   overflow: hidden;
// `;

// const StarBackground: React.FC = () => {
//   return (
//     <StarBackgroundContainer>
//       <Stars />
//       <Stars1 />
//       <Stars2 />
//       <ShootingStarsComponent />
//     </StarBackgroundContainer>
//   );
// };

// export default StarBackground;
import React, { useEffect, useState } from 'react';
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
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prevKey => prevKey + 1);  // 키 값을 변경하여 컴포넌트를 리렌더링
    }, 130000);  // 130초 후 애니메이션을 리셋

    return () => clearInterval(interval);
  }, []);

  return (
    <StarBackgroundContainer key={key}>
      <Stars />
      <Stars1 />
      <Stars2 />
      <ShootingStarsComponent />
    </StarBackgroundContainer>
  );
};

export default StarBackground;
