import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Image, MainContainer
} from '../assets/styles';
import {
  LogArea, LogHeader, LogNickname, ChatImage, ChatSummary, Solution, PersonalitySection, PersonalityImage, PersonalityDescription, LogDate, GmarketSansMedium,
  DownButton, CosultButton, RankingButton, ShareButton, ButtonContainer,
} from './logstyles'; 
import StarBackground from '../assets/StarBackground';
import personaImg from '../assets/png/persona.png';

const Log: React.FC = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const character = location.state?.character;

  const handleBackClick = () => {
    navigate(-1);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return now.toLocaleDateString('ko-KR', options);
  };

  return (
    <MainContainer>
      <StarBackground />
      <ButtonContainer>
        <LogArea>
          <LogHeader>
            <GmarketSansMedium>
              상담일지
            </GmarketSansMedium>
          </LogHeader>
          <LogNickname>{nickname}</LogNickname>
          <ChatImage src="/path/to/chat-image.png" alt="Chat related" /> {/* 이미지 경로를 업데이트 */}
          <ChatSummary>
            상담 내용 요약
          </ChatSummary>
          <Solution>
            해결 방안
          </Solution>
          <PersonalitySection>
            <PersonalityDescription>상담사 | {character?.name}</PersonalityDescription> {/* 캐릭터 이름 사용 */}
            <PersonalityImage src={character?.img} alt="Personality" /> {/* 캐릭터 이미지 사용 */}
          </PersonalitySection>
          <LogDate>{getCurrentDate()}</LogDate>
        </LogArea>
        <DownButton>
          <GmarketSansMedium>다운로드</GmarketSansMedium>
        </DownButton>
        <ShareButton>
          <GmarketSansMedium>공유하기</GmarketSansMedium>
        </ShareButton>
        <CosultButton onClick={() => navigate(`/select/${nickname}`)}>
          <GmarketSansMedium>상담하러가기</GmarketSansMedium>
        </CosultButton>
        <RankingButton onClick={() => navigate('/topselect')}>
          <GmarketSansMedium>인기챗봇순위</GmarketSansMedium>
        </RankingButton>
      </ButtonContainer>
    </MainContainer>
  );
};

export default Log;
