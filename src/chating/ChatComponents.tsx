import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { Character } from '../assets/initCharacter';
import { AlertOverlay, AlertBox, AlertButtons, AlertButtonCancle, AlertButtonFinish } from './component/chatingStyles';
import { GmarketSansMedium } from '../assets/styles';
import {
  LogNickname, ChatImage, ChatSummary, Solution, PersonalitySection, PersonalityImage, PersonalityDescription, LogDate, LogHeaderImage,
  DownButton, CosultButton, RankingButton, ModalOverlay, ModalContent, LogImage, LogContainer, ButtonContainer, LogHeaderContainer, LogHeader
} from './component/logstyles';
import penImg from '../assets/png/pen.png';
import logpersonaImg from '../assets/png/logpersona.png';
import chatImg from '../assets/png/uncleback.png';
import downloadImg from '../assets/png/download.png';

export const CustomAlert: React.FC<{ message: string; onConfirm: () => void; onCancel: () => void }> = ({ message, onConfirm, onCancel }) => {
  return (
    <AlertOverlay>
      <AlertBox>
        <p>{message}</p>
        <AlertButtons>
          <AlertButtonCancle onClick={onCancel}>취소</AlertButtonCancle>
          <AlertButtonFinish onClick={onConfirm}>종료</AlertButtonFinish>
        </AlertButtons>
      </AlertBox>
    </AlertOverlay>
  );
};

export const LogModal: React.FC<{ character: Character; nickname: string | undefined; summaryLog: any; onClose: () => void }> = ({ character, nickname, summaryLog, onClose }) => {
  if (!summaryLog) {
    return <div>Loading...</div>;
  }

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return now.toLocaleDateString('ko-KR', options);
  };

  const navigate = useNavigate();
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  const handleRankingClick = () => {
    navigate(`/topselect`);
  };

  const handleDownload = () => {
    if (logContainerRef.current) {
      html2canvas(logContainerRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'log.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <LogHeaderContainer>
          <LogHeader>
            <LogHeaderImage src={penImg} alt="Pen Icon" />
            <GmarketSansMedium style={{ color: '#DEDDBC', fontSize: '50px' }}>상담일지</GmarketSansMedium>
          </LogHeader>
        </LogHeaderContainer>
        <LogContainer ref={logContainerRef}>
          <LogImage src={summaryLog.image || logpersonaImg} alt="Persona" />
          <LogNickname>{nickname}</LogNickname>
          <ChatImage src={chatImg} alt="Chat related" />
          <ChatSummary>
            {summaryLog.summary || "상담 내용을 불러오는 중..."}
          </ChatSummary>
          <Solution>
            {summaryLog.conclusion || "해결 방안을 불러오는 중..."}
          </Solution>
          <PersonalitySection>
            <PersonalityDescription>{character?.name}</PersonalityDescription>
            <PersonalityImage src={character?.img} alt="Personality" />
          </PersonalitySection>
          <LogDate>{getCurrentDate()}</LogDate>
        </LogContainer>
        <ButtonContainer>
          <DownButton onClick={handleDownload}>
            <img src={downloadImg} alt="Download Icon" style={{ width: '24px', height: '24px' }} />
            <GmarketSansMedium style={{ color: '#fff' }}>다운로드</GmarketSansMedium>
          </DownButton>
          <CosultButton onClick={onClose}>
            <GmarketSansMedium style={{ color: '#fff' }}>상담하러가기</GmarketSansMedium>
          </CosultButton>
          <RankingButton onClick={handleRankingClick}>
            <GmarketSansMedium style={{ color: '#fff' }}>인기챗봇순위</GmarketSansMedium>
          </RankingButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};
