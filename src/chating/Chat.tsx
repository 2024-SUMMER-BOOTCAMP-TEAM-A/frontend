import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import socket from './socket';
import {
  UPCharacterProfile, ChatingBox, UserInputBox, CustomAlert, LogModal
} from './ChatComponents';
import { Stars, Stars1, Stars2 } from '../assets/styles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';
import { Character } from '../assets/initCharacter';
import { ChatContainer } from './component/chatingStyles';
import { selectPersona } from './chatAPI';

interface Message {
  sender: string;
  message: string;
}

interface ChatProps {
  initialCharacter: Character;
}

function getToken() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
}

async function startChat() {
  try {
      // 로컬스토리지에서 토큰 가져오기
      const tokens = getToken();
      
      if (!tokens) {
          throw new Error('No token found in localStorage.');
      }

      // 인격 번호 선택하기
      const personaId = await selectPersona();
      
      // 토큰과 인격 번호를 함께 전송
      const token = tokens.accessToken;
      socket.emit('start chat', { token, personaId });
      
      console.log('Chat started with token and personaId:', { token, personaId });
  } catch (error) {
      console.error('Error starting chat:', error);
  }
}

const Chat: React.FC<ChatProps> = ({ initialCharacter }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  let silenceTimer: ReturnType<typeof setTimeout>;
  let mediaRecorder: MediaRecorder;

  const navigate = useNavigate();
  const location = useLocation();
  const { character, nickname } = location.state || { character: initialCharacter, nickname: '' };

  useEffect(() => {
  
    socket.emit('start chat', startChat());

    const handleChatMessage = (message: Message) => {
      console.log('handleChatMessage:', message);
      setMessages((prevMessages) => {
        if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].message === message.message && prevMessages[prevMessages.length - 1].sender === message.sender) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
      scrollToBottom();
    };

    const handleTtsAudio = (data: { audio: string }) => {
      if (data.audio) {
        const audio = new Audio(`data:audio/mpeg;base64,${data.audio}`);
        audio.play();
      }
    };

    const handleTranscript = (data: { message: string }) => {
      console.log('handleTranscript:', data.message);
      setMessages((prevMessages) => [...prevMessages, { sender: nickname, message: data.message }]);
      resetSilenceTimer();
    };

    const handleError = (data: { message: string }) => {
      console.error('Error:', data.message);
    };

    socket.on('chat log created', (data: { code: number; data: any }) => {
      if (data.code === 201) {
        console.log('Chat log created:', data.data);
      } else {
        console.error('Failed to create chat log:', data.data);
      }
    });

    socket.on('chat message', handleChatMessage);
    socket.on('tts audio', handleTtsAudio);
    socket.on('transcript', handleTranscript);
    socket.on('error', handleError);

    return () => {
      socket.off('chat log created');
      socket.off('chat message', handleChatMessage);
      socket.off('tts audio', handleTtsAudio);
      socket.off('transcript', handleTranscript);
      socket.off('error', handleError);
    };
  }, [nickname]);

  const sendMessage = (message: string) => {
    console.log('sendMessage:', message);
    if (message.trim()) {
      socket.emit('chat message', { content: message, sender: nickname });
      setMessages((prevMessages) => [...prevMessages, { sender: nickname, message }]);
      setInput('');
    }
  };

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }, 5000); // Set the timeout duration
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEndChat = () => {
    socket.emit('end chat');
  };

  const handleStartSTT = async () => {
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(audioStream, { mimeType: 'audio/webm' });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        socket.emit('audio message', event.data);
      }
    };

    mediaRecorder.onstop = () => {
      clearTimeout(silenceTimer);
      socket.emit('end stt');
    };

    mediaRecorder.start(250);

    socket.emit('start stt');
    resetSilenceTimer();
  };

  const handleCloseChat = () => {
    setIsAlertOpen(true);
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

  const convertedMessages = messages.map((msg) => ({
    text: msg.message,
    isUser: msg.sender === nickname,
  }));

  return (
    <ChatContainer>
      <UPCharacterProfile name={character.name} onClose={handleCloseChat} fontFamily={character.fontFamily} />
      <ChatingBox 
        messages={convertedMessages}
        isTyping={isTyping}
        character={character}
      />
      <UserInputBox 
        input={input} 
        setInput={setInput} 
        sendMessage={sendMessage}
        handleStartSTT={handleStartSTT}
      />
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
