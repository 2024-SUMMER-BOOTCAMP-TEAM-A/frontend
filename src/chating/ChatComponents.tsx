import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useNavigate, useParams } from 'react-router-dom';
import TypingWaiting from './component/TypingWaiting';
import { Character } from '../assets/initCharacter'; 
import { ReactComponent as Leftarrow } from '../assets/svg/leftarrow.svg';
import { ReactComponent as Closeicon } from '../assets/svg/closeIcon.svg';
import {
  CloseButton, ChatBox, CharacterChat, UserChat, CharacterChatContent, UserChatContent, CharacterAvatar, CharacterMessage, UserMessage, CharacterProfile,
  ProfileName, UserInputCon, InputMessage, SendButton, MicButton, AlertOverlay, AlertBox, AlertButtons, AlertButtonCancle, AlertButtonFinish,
} from './component/chatingStyles';
import { Stars, Stars1, Stars2, GmarketSansMedium } from '../assets/styles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';
import {
  LogNickname, ChatImage, ChatSummary, Solution, PersonalitySection, PersonalityImage, PersonalityDescription, LogDate, LogHeaderImage,
  DownButton, CosultButton, RankingButton, ModalOverlay, ModalContent, LogImage, LogContainer, ButtonContainer, LogHeaderContainer, LogHeader
} from './component/logstyles';
import penImg from '../assets/png/pen.png';
import logpersonaImg from '../assets/png/logpersona.png';
import chatImg from '../assets/png/uncleback.png'; 
import downloadImg from '../assets/png/download.png';

export const UPCharacterProfile: React.FC<{ name: string; onClose: () => void; fontFamily?: string }> = ({ name, onClose, fontFamily }) => {
  const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();

  return (
    <CharacterProfile>
      <Leftarrow onClick={() => navigate(`/select/${nickname}`)} />
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

export const UserInputBox: React.FC<{ input: string; setInput: (input: string) => void; sendMessage: (message: string) => void; handleStartSTT: () => void }> = ({ input, setInput, sendMessage, handleStartSTT }) => {

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSend(); 
    }
  };

  return (
    <UserInputCon>
      <InputMessage
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} 
        placeholder="메시지를 입력하세요."
      />
      <SendButton onClick={handleSend}>Send</SendButton>
      <MicButton onClick={handleStartSTT}>Start STT</MicButton>
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

export const LogModal: React.FC<{ character: Character; nickname: string | undefined; onClose: () => void }> = ({ character, nickname, onClose }) => {
  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return now.toLocaleDateString('ko-KR', options);
  };

  const navigate = useNavigate();
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  const handleRankingClick = () => {
    navigate(`/topselect/${nickname}`);
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
          <LogImage src={logpersonaImg} alt="Persona" />
          <LogNickname>{nickname}</LogNickname>
          <ChatImage src={chatImg} alt="Chat related" /> {/* Placeholder for chat-related image */}
          <ChatSummary>
            <br />
            상담내용 상담내용 요약~상담내용 요약~상담내용 요약~상담내용 요약~상담내용 요약~상담내용 요약~상담내용 요약~상담내용 요약~상담내용 요약~상담내용 요약~상담내용 요약~상담
          </ChatSummary>
          <Solution>
            <br />
            <span>해결 방안~해결 방안~해결 방안~해결 방안~</span>
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
