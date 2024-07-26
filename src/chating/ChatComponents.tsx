import React, { useState, useEffect, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { Character } from '../assets/initCharacter';
import { AlertOverlay, AlertBox, AlertButtons, AlertButtonCancle, AlertButtonFinish, CharacterProfile, ProfileName, CloseButton, UserMessage, CharacterMessage
  ,CharacterChatContent, ChatBox, UserChat, CharacterChat, UserInputCon, InputMessage, UserChatContent,CharacterAvatar, SendButton, MicButton
 } from './component/chatingStyles';
import { GmarketSansMedium } from '../assets/styles';
import {
  LogNickname, ChatImage, ChatSummary, Solution, PersonalitySection, PersonalityImage, PersonalityDescription, LogDate, LogHeaderImage,
  DownButton, CosultButton, RankingButton, ModalOverlay, ModalContent, LogImage, LogContainer, ButtonContainer, LogHeaderContainer, LogHeader
} from './component/logstyles';
import penImg from '../assets/png/pen.png';
import logpersonaImg from '../assets/png/logpersona.png';
import downloadImg from '../assets/png/download.png';
import { debounce } from 'lodash';
import axios from 'axios';
import LottieAnimation from './stt';
import TypingWaiting from './component/TypingWaiting';
import { ReactComponent as Leftarrow } from '../assets/svg/leftarrow.svg';
import { ReactComponent as Closeicon } from '../assets/svg/closeIcon.svg';

export const UPCharacterProfile: React.FC<{ name: string; onClose: () => void; fontFamily?: string }> = ({ name, onClose, fontFamily }) => {
  const navigate = useNavigate();

  return (
    <CharacterProfile>
      <Leftarrow onClick={() => navigate(-1)} />
      <ProfileName style={{ fontFamily }}>{name}</ProfileName>
      <CloseButton onClick={onClose}>
        <Closeicon />
      </CloseButton>
    </CharacterProfile>
  );
};

interface CharacterChatContentProps {
  isTyping: boolean;
  chatEndRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  backgroundColor?: string;
  fontFamily?: string;
}

export const CharacterChatCon: React.FC<CharacterChatContentProps> = ({ isTyping, chatEndRef, children, backgroundColor, fontFamily }) => {
  const [showText, setShowText] = useState<React.ReactNode>(null);
  const [showTyping, setShowTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      setShowText(null);
      setShowTyping(true);
    } else {
      const timer = setTimeout(() => {
        setShowText(children);
        setShowTyping(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isTyping, children]);

  useEffect(() => {
    if (showText && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [showText, chatEndRef]);

  return (
    <CharacterChatContent style={{ backgroundColor, fontFamily }}>
      {showTyping ? <TypingWaiting /> : showText}
    </CharacterChatContent>
  );
};

export const ChatingBox: React.FC<{ messages: { text: string; isUser: boolean }[]; isTyping: boolean; character: Character }> = ({ messages, isTyping, character }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isTyping]);

  return (
    <ChatBox>
      {messages.map((msg, index) => (
        <div key={index} className={msg.isUser ? UserMessage : CharacterMessage}>
          {msg.isUser ? (
            <UserChat>
              <UserChatContent>{msg.text}</UserChatContent>
            </UserChat>
          ) : (
            <CharacterChat>
              <CharacterAvatar src={character.img} alt="Character Avatar" />
              <CharacterChatCon
                isTyping={index === messages.length - 1 && isTyping}
                chatEndRef={chatEndRef}
                backgroundColor={character.background}
                fontFamily={character.fontFamily}
              >
                {msg.text}
              </CharacterChatCon>
            </CharacterChat>
          )}
        </div>
      ))}
      <div ref={chatEndRef} />
    </ChatBox>
  );
};

export const UserInputBox: React.FC<{ input: string; setInput: (input: string) => void; sendMessage: (message: string) => void; handleStartSTT: () => void; handleEndSTT: () => void; }> = ({ input, setInput, sendMessage, handleStartSTT, handleEndSTT }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = useCallback(debounce(() => {
    const sanitizedInput = input.replace(/(\r\n|\n|\r)/gm, '').trim(); // 개행 문자 제거 및 불필요한 공백 제거
    if (sanitizedInput) {
      sendMessage(sanitizedInput);
      setInput('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, 300), [input, sendMessage, setInput]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <UserInputCon>
      <InputMessage
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요."
        ref={inputRef}
      />
      <SendButton onClick={handleSend}>Send</SendButton>
      <MicButton onMouseDown={handleStartSTT} onMouseUp={handleEndSTT}>Hold to Speak</MicButton>
    </UserInputCon>
  );
};

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

const fetchSummaryLog = async (logId: string) => {
  try {
    const response = await axios.get(`https://person-a.site/api/v1/logs/summary/${logId}`);
    //const response = await axios.get(`http://localhost:8000/api/v1/logs/summary/${logId}`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching summary log:', error);
    return null;
  }
};

interface LogModalProps {
  character: Character;
  nickname: string | undefined;
  summaryLogId: string;
  onClose: () => void;
}

export const LogModal: React.FC<LogModalProps> = ({ character, nickname, summaryLogId, onClose }) => {
  const [summaryLog, setSummaryLog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLog = async () => {
      const log = await fetchSummaryLog(summaryLogId);
      console.log('Fetched Log:', log);
      if (log && log.summaryLog) {
        setSummaryLog(log.summaryLog); // 중첩된 summaryLog를 설정합니다.
      }
      setLoading(false);
    };

    fetchLog();
  }, [summaryLogId]);

  const navigate = useNavigate();
  const logContainerRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!summaryLog) {
    return <div>Error loading log.</div>;
  }

  console.log('SummaryLog state:', summaryLog);
  
  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return now.toLocaleDateString('ko-KR', options);
  };

  const handleRankingClick = () => {
    navigate(`/topselect`);
  };

  const handleDownload = () => {
    if (logContainerRef.current) {
      html2canvas(logContainerRef.current, {
        useCORS: true,
        backgroundColor: '#D6EAF8', 
        scale: 2
      }).then((canvas) => {
        const a4Width = 210; 
        const a4Height = 297; 
        const a4Aspect = a4Height / a4Width;
  
        const expectedCanvasHeight = canvas.width * a4Aspect;
  
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = canvas.width;
        croppedCanvas.height = expectedCanvasHeight;
  
        const croppedContext = croppedCanvas.getContext('2d');
        if (!croppedContext) {
          console.error('Failed to get 2D context');
          return;
        }

        croppedContext.drawImage(canvas, 0, 0, canvas.width, expectedCanvasHeight);
  
        const imgData = croppedCanvas.toDataURL('image/webp', 1.0);
  
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
  
        pdf.addImage(imgData, 'WEBP', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
        pdf.save('log.pdf');
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
          <LogImage src={logpersonaImg} alt="Persona" />
          <LogNickname>{summaryLog.user}</LogNickname>
          <ChatImage src={summaryLog.image} alt="Chat related" />
          <ChatSummary>
            <br/>
            {summaryLog.summary}
          </ChatSummary>
          <Solution>
            <br/>
            <strong style={{ fontSize: '1.1em' }}>{summaryLog.conclusion}</strong>
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
