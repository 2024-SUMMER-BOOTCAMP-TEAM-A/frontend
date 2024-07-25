// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   MainContainer, BackButton, Display, CharacterContainer, FirstPlaceContainer, OtherPlacesContainer, FirstPlaceImage, OtherPlaceImage, FirstPlaceComment
// } from './topselectstyles';
// import {
//   GmarketSansMedium, Moon, Image, Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar, LogoutButton
// } from '../assets/styles';
// import luckyImage from '../assets/png/lucky.png';
// import mzImage from '../assets/png/mz.png';
// import leemalImage from '../assets/png/leemal.png';
// import uncleImage from '../assets/png/uncle.png';
// import personaImg from '../assets/png/persona.png';
// import StarBackground from '../assets/StarBackground';
// import BarChart from './BarChart';
// import { getPersonsByCountDesc, Person } from './topselectAPI';

// const characterImages: Record<string, string> = {
//   '장원영': luckyImage,
//   '이서진': uncleImage,
//   '침착맨': leemalImage,
//   '김아영': mzImage,
// };

// const TopSelect: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { nickname } = location.state || { nickname: 'No nickname provided' };
//   const [persons, setPersons] = useState<Person[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getPersonsByCountDesc();
//         console.log('Fetched data:', data);
//         setPersons(data);
//       } catch (error) {
//         console.error('Error fetching persons:', error);
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const firstPlaceComment = (character: string) => {
//     const commonStyle = { fontSize: '25px' };

//     switch (character) {
//       case '장원영':
//         return <Ownglyph_ryuttung_Rg style={commonStyle}>내가 1등이라고?! 완전 럭키비키잖아~</Ownglyph_ryuttung_Rg>;
//       case '김아영':
//         return <Gothic_Goding style={commonStyle}>제가 1등이네요</Gothic_Goding>;
//       case '이서진':
//         return <Cafe24Shiningstar style={commonStyle}>아이 뭐, 나는 항상 1등이니까~</Cafe24Shiningstar>;
//       case '침착맨':
//         return <KyoboHandwriting2020A style={commonStyle}>ㅋㅋㅋㅋㅋ</KyoboHandwriting2020A>;
//       default:
//         return '';
//     }
//   };

//   const sortedPersons = [...persons].sort((a, b) => b.count - a.count);
//   const topPerson = sortedPersons[0];

//   const voteData = persons.reduce((acc: { [key: string]: number }, person) => {
//     acc[person.name] = person.count;
//     return acc;
//   }, {});

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <MainContainer>
//       <StarBackground />
//       <Image src={personaImg} alt="Persona" style={{ width: '30%', height: 'auto' }} />
//       <Moon style={{ width: '15%', height: '30%' }} />
//       <Display>
//         <CharacterContainer>
//           {topPerson && (
//             <FirstPlaceContainer>
//               <FirstPlaceImage src={characterImages[topPerson.name]} alt={topPerson.name} />
//               <FirstPlaceComment>{firstPlaceComment(topPerson.name)}</FirstPlaceComment>
//             </FirstPlaceContainer>
//           )}
//           <OtherPlacesContainer>
//             {sortedPersons.slice(1).map(person => (
//               <OtherPlaceImage key={person.id} src={characterImages[person.name]} alt={person.name} />
//             ))}
//           </OtherPlacesContainer>
//         </CharacterContainer>
//         <BarChart data={voteData} width="60%" height="80vh" />
//       </Display>
//       <BackButton onClick={handleBackClick} />
//       <LogoutButton onClick={handleLogout}>
//         <GmarketSansMedium style={{ fontSize: '15px' }}>로그아웃</GmarketSansMedium>
//       </LogoutButton>
//     </MainContainer>
//   );
// };

// export default TopSelect;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MainContainer, BackButton, Book, CharacterContainer, FirstPlaceContainer, OtherPlacesContainer, FirstPlaceImage, OtherPlaceImage, FirstPlaceComment,
  Page
} from './topselectstyles';
import {
  GmarketSansMedium, Moon, Image, Gothic_Goding, KyoboHandwriting2020A, Ownglyph_ryuttung_Rg, Cafe24Shiningstar, LogoutButton, AnimatedImage
} from '../assets/styles';
import luckyImage from '../assets/png/lucky.png';
import mzImage from '../assets/png/mz.png';
import leemalImage from '../assets/png/leemal.png';
import uncleImage from '../assets/png/uncle.png';
import personaImg from '../assets/png/persona.png';
import StarBackground from '../assets/StarBackground';
import BarChart from './BarChart';
import { getPersonsByCountDesc, Person } from './topselectAPI';

const characterImages: Record<string, string> = {
  '장원영': luckyImage,
  '이서진': uncleImage,
  '침착맨': leemalImage,
  '김아영': mzImage,
};

const TopSelect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = location.state || { nickname: 'No nickname provided' };
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPersonsByCountDesc();
        console.log('Fetched data:', data);
        setPersons(data);
      } catch (error) {
        console.error('Error fetching persons:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const firstPlaceComment = (character: string) => {
    const commonStyle = { fontSize: '25px' };

    switch (character) {
      case '장원영':
        return <Ownglyph_ryuttung_Rg style={commonStyle}>내가 1등이라고?! 완전 럭키비키잖아~</Ownglyph_ryuttung_Rg>;
      case '김아영':
        return <Gothic_Goding style={commonStyle}>제가 1등이네요</Gothic_Goding>;
      case '이서진':
        return <Cafe24Shiningstar style={commonStyle}>아이 뭐, 나는 항상 1등이니까~</Cafe24Shiningstar>;
      case '침착맨':
        return <KyoboHandwriting2020A style={commonStyle}>ㅋㅋㅋㅋㅋ</KyoboHandwriting2020A>;
      default:
        return '';
    }
  };

  const sortedPersons = [...persons].sort((a, b) => b.count - a.count);
  const topPerson = sortedPersons[0];

  const voteData = persons.reduce((acc: { [key: string]: number }, person) => {
    acc[person.name] = person.count;
    return acc;
  }, {});

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <MainContainer>
      <StarBackground />
      <AnimatedImage src={personaImg} alt="Persona" onClick={handleLogoClick} style={{ width: '30%', height: 'auto' }} />
      <Moon style={{ width: '15%', height: '30%' }} />
      <Book>
        <Page className="front"></Page>
        <Page className="page1"></Page>
        <Page className="page2"></Page>
        <Page className="page3"></Page>
        <Page className="page4"></Page>
        <Page className="page5">
        <CharacterContainer>
            {topPerson && (
              <FirstPlaceContainer>
                <FirstPlaceImage src={characterImages[topPerson.name]} alt={topPerson.name} />
                <FirstPlaceComment>{firstPlaceComment(topPerson.name)}</FirstPlaceComment>
              </FirstPlaceContainer>
            )}
            <OtherPlacesContainer>
              {sortedPersons.slice(1).map(person => (
                <OtherPlaceImage key={person.id} src={characterImages[person.name]} alt={person.name} />
              ))}
            </OtherPlacesContainer>
          </CharacterContainer>
        </Page>
        <Page className="page6">
        <BarChart data={voteData} width="80%" height="80vh" />

        </Page>
        <Page className="back"></Page>
      </Book>
      <BackButton onClick={handleBackClick} />
      <LogoutButton onClick={handleLogout}>
        <GmarketSansMedium style={{ fontSize: '15px' }}>로그아웃</GmarketSansMedium>
      </LogoutButton>
    </MainContainer>
  );
};

export default TopSelect;
