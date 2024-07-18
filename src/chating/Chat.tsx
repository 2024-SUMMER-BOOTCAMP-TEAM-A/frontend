import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Character } from '../assets/initCharacter'; 
import {
  UPCharacterProfile, ChatingBox, UserInputBox, CustomAlert, LogModal
} from './ChatComponents';
import { ChatContainer } from './component/chatingStyles';
import { Stars, Stars1, Stars2 } from '../assets/styles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';

// ChatProps 인터페이스 정의
interface ChatProps {
  initialCharacter: Character;
}

// Chat 컴포넌트의 props 타입 정의
const Chat: React.FC<ChatProps> = ({ initialCharacter }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character, nickname } = location.state || { character: initialCharacter, nickname: '' };
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);

  useEffect(() => {
    console.log('Character from location state:', character);
    console.log('Nickname:', nickname);

    // 초기 메시지와 타이핑 상태를 설정합니다.
    const startChat = () => {
      setIsTyping(true);
      setMessages([{ text: `Hi! I'm ${character.name}. How can I help you?`, isUser: false }]);
      setIsTyping(false);
    };

    startChat();
  }, [character, nickname]);

  const handleSend = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true }]);

    setIsTyping(true);

    // 타이핑 애니메이션 후 응답 메시지를 추가하도록 지연 설정
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: `Here is a response to "${message}"`, isUser: false }]);
      setIsTyping(false);
    }, 500); // 0.5초 지연, 필요에 따라 지연 시간 조정 가능
  };

  const handleCloseChat = () => {
    setIsAlertOpen(true); // 알림창을 엽니다.
  };

  const handleConfirmCloseChat = () => {
    setIsAlertOpen(false);
    setIsLogOpen(true);
  };

  const handleCancelCloseChat = () => {
    setIsAlertOpen(false);
  };

  const handleCloseLog = () => {
    setIsLogOpen(false);
    navigate('/select', { state: { nickname } });
  };

  if (!isChatOpen) return null;

  return (
    <ChatContainer>
      <UPCharacterProfile name={character.name} onClose={handleCloseChat} fontFamily={character.fontFamily} />
      <ChatingBox messages={messages} isTyping={isTyping} character={character} />
      <UserInputBox onSend={handleSend} />
      <Stars />
      <Stars1 />
      <Stars2 />
      <ShootingStarsComponent />
      {isAlertOpen && <CustomAlert message="정말로 채팅을 끝내시겠습니까?" onConfirm={handleConfirmCloseChat} onCancel={handleCancelCloseChat} />}
      {isLogOpen && <LogModal character={character} nickname={nickname || 'No nickname provided'} onClose={handleCloseLog} />}
    </ChatContainer>
  );
};

export default Chat;
