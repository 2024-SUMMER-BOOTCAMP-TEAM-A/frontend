import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useNavigate, useParams } from 'react-router-dom';
import TypingWaiting from './component/TypingWaiting';
import { Character } from '../assets/initCharacter'; 
import { ReactComponent as Leftarrow } from '../assets/svg/leftarrow.svg';
import { ReactComponent as Closeicon } from '../assets/svg/closeIcon.svg';
import {
  CloseButton, ChatBox, CharacterChat, UserChat, CharacterChatContent, UserChatContent, CharacterAvatar, CharacterMessage, UserMessage, CharacterProfile,
  ProfileName, UserInputCon, InputMessage, SendButton, MicButton,  AlertOverlay, AlertBox, AlertButtons, AlertButtonCancle, AlertButtonFinish,
} from './component/chatingStyles';
import { Stars, Stars1, Stars2, GmarketSansMedium } from '../assets/styles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';
import {
  LogNickname, ChatImage, ChatSummary, Solution, PersonalitySection, PersonalityImage, PersonalityDescription, LogDate,LogHeaderImage,
  DownButton, CosultButton, RankingButton, ModalOverlay, ModalContent, LogImage, LogContainer, ButtonContainer, LogHeaderContainer, LogHeader
} from './component/logstyles';
import penImg from '../assets/png/pen.png';
import logpersonaImg from '../assets/png/logpersona.png';
import chatImg from '../assets/png/uncleback.png'; // 채팅 관련 이미지가 나중에 수정
import downloadImg from '../assets/png/download.png';

// 상단바
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
      setShowText(null); // 타이핑 중에는 메시지를 숨깁니다.
      setShowTyping(true); // 타이핑 애니메이션을 표시합니다.
    } else {
      const timer = setTimeout(() => {
        setShowText(children); // 타이핑이 끝나면 메시지를 표시합니다.
        setShowTyping(false); // 메시지가 표시된 후 타이핑 애니메이션을 숨깁니다.
      }, 1000); // 1초 동안 타이핑 애니메이션 표시

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머를 정리합니다.
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

// 채팅 창
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

// 입력창
export const UserInputBox: React.FC<{ onSend: (message: string) => void }> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터 키의 기본 동작(예: 폼 제출)을 방지합니다.
      handleSend(); // 메시지를 전송합니다.
    }
  };

  return (
    <UserInputCon>
      <InputMessage
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터 키 이벤트를 처리합니다.
        placeholder="메시지를 입력하세요..."
      />
      <SendButton onClick={handleSend} />
      <MicButton />
    </UserInputCon>
  );
};

// 알람창
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

// 상담일지 모달
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

  // 다운로드
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
            <GmarketSansMedium style={{ color: '#DEDDBC', fontSize:'50px' }}>상담일지</GmarketSansMedium>
          </LogHeader>
        </LogHeaderContainer>
        <LogContainer ref={logContainerRef}>
          <LogImage src={logpersonaImg} alt="Persona" />
          <LogNickname>{nickname}</LogNickname>
          <ChatImage src={chatImg} alt="Chat related" /> {/* 나중에 수정해야함 채팅관련 이미지 */}
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
