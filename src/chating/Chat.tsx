import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import socket from './socket';
import { CustomAlert, LogModal } from './ChatComponents';
import { Stars, Stars1, Stars2 } from '../assets/styles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';
import { Character } from '../assets/initCharacter';
import { ChatContainer } from './component/chatingStyles';
import LoadingModal from './component/LoadingModal';
import { CloseButton, ChatBox, CharacterChat, UserChat, CharacterChatContent, UserChatContent, CharacterAvatar, CharacterMessage, UserMessage, CharacterProfile,
  ProfileName, UserInputCon, InputMessage, SendButton, MicButton } from './component/chatingStyles';
import TypingWaiting from './component/TypingWaiting';
import { ReactComponent as Leftarrow } from '../assets/svg/leftarrow.svg';
import { ReactComponent as Closeicon } from '../assets/svg/closeIcon.svg';
import { debounce } from 'lodash';
import LottieAnimation from './stt';

interface Message {
  sender: string;
  message: string;
}

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

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatLogId, setChatLogId] = useState<string>('');
  const [summaryLog, setSummaryLog] = useState<any>(null);
  const [isLottieOpen, setIsLottieOpen] = useState<boolean>(false); // 추가
  const messageEndRef = useRef<HTMLDivElement>(null);
  let silenceTimer: ReturnType<typeof setTimeout>;
  let mediaRecorder: MediaRecorder;

  const { nickname } = useParams<{ nickname: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const character = location.state?.character as Character;

  // useEffect(() => {
  //   // 캐릭터 정보를 콘솔에 출력
  //   console.log('Selected character:', character);
  // }, [character]);

  useEffect(() => {
    console.log('Selected character:', character);
      if (character && character.greeting) {
      const isGreetingMessageExists = messages.some(
        (msg) => msg.sender === 'system' && msg.message === character.greeting
      );
  
      if (!isGreetingMessageExists) {
        const greetingMessage: Message = {
          sender: 'system',
          message: character.greeting
        };
        setMessages(() => [greetingMessage]);

        // TTS 음성 파일 재생
        if (character.ttsFile) {
          const audioUrl = character.ttsFile;
          const audio = new Audio(audioUrl);
          audio.play().catch((error) => {
            console.error('Error playing TTS audio:', error);
          });
        }
      }
    } else {
      console.error('Character or greeting is not defined');
    }
  }, [character]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    socket.emit('start chat', { token });

    const handleChatMessage = (message: Message) => {
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
      setMessages((prevMessages) => [...prevMessages, { sender: nickname!, message: data.message }]);
      resetSilenceTimer();
    };

    const handleError = (data: { message: string }) => {
      console.error('Error:', data.message);
    };

    const handleChatLogSaved = async (data: { chatLogId: string }) => {
      console.log('Chat log ID received from server:', data.chatLogId);
      setChatLogId(data.chatLogId);
      await handleEndChat(data.chatLogId);
    };

    socket.on('chat message', handleChatMessage);
    socket.on('tts audio', handleTtsAudio);
    socket.on('transcript', handleTranscript);
    socket.on('error', handleError);
    socket.on('chat log saved', handleChatLogSaved);

    return () => {
      socket.off('chat message', handleChatMessage);
      socket.off('tts audio', handleTtsAudio);
      socket.off('transcript', handleTranscript);
      socket.off('error', handleError);
      socket.off('chat log saved', handleChatLogSaved);
    };

  }, [character]);

  const sendMessage = (message: string) => {
    const sanitizedMessage = message.replace(/(\r\n|\n|\r)/gm, '').trim();
    if (sanitizedMessage) {
      socket.emit('chat message', { content: sanitizedMessage, sender: nickname });
      setMessages((prevMessages) => [...prevMessages, { sender: nickname!, message: sanitizedMessage }]);
      setInput('');
    }
  };

  const resetSilenceTimer = () => {
    clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }, 5000);
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      setIsLottieOpen(false); // 애니메이션 닫기
    };

    mediaRecorder.start(250);
    socket.emit('start stt');
    setIsLottieOpen(true); // 애니메이션 열기
    resetSilenceTimer();
  };

  const handleEndChat = async (chatLogId: string) => {
    console.log('Trying to end chat with chatLogId:', chatLogId);
    if (!chatLogId) {
      console.error('No chatLogId found');
      return;
    }

    try {
      setIsLoading(true);
      // const response = await axios.post('https://person-a.site/api/v1/logs/summary', { chatLogId });
      const response = await axios.post('http://localhost:8000/api/v1/logs/summary', { chatLogId });
      console.log('Summary saved successfully:', response.data);
      const summaryLogId = response.data.summaryLogId;
      setSummaryLogId(summaryLogId); // summaryLogId 설정
      fetchSummaryLog(summaryLogId);
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };

  const fetchSummaryLog = async (summaryLogId: string) => {
    try {
      // const response = await axios.get(`https://person-a.site/api/v1/logs/summary/${summaryLogId}`);
      const response = await axios.get(`http://localhost:8000/api/v1/logs/summary/${summaryLogId}`);
      console.log('Summary fetched successfully:', response.data);
      setSummaryLog(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCloseChat = () => {
    socket.emit('end chat');
    setIsAlertOpen(false);
    setIsLogOpen(true);
  };

  const handleCloseChat = () => {
    setIsAlertOpen(true);
  };

  const handleCancelCloseChat = () => {
    setIsAlertOpen(false);
  };

  const handleCloseLog = () => {
    console.log('Handling close log');
    console.log('Summary Log:', summaryLog);
    setIsLogOpen(false);
    navigate(-1);
  };

  const handleEndSTT = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  if (!isChatOpen) return null;

  const convertedMessages = messages.map((msg) => ({
    text: msg.message,
    isUser: msg.sender === nickname,
  }));

  return (
    <ChatContainer>
      <UPCharacterProfile 
        name={character.name} 
        onClose={handleCloseChat} 
        fontFamily={character.fontFamily} 
      />
      <ChatingBox messages={convertedMessages} isTyping={isTyping} character={character} />
      <UserInputBox 
        input={input} 
        setInput={setInput} 
        sendMessage={sendMessage}
        handleStartSTT={handleStartSTT}
        handleEndSTT={handleEndSTT}
      />
      <Stars />
      <Stars1 />
      <Stars2 />
      <ShootingStarsComponent />
      {isAlertOpen && <CustomAlert message="정말로 채팅을 끝내시겠습니까?" onConfirm={handleConfirmCloseChat} onCancel={handleCancelCloseChat} />}
      {isLogOpen && <LogModal character={character} nickname={nickname} summaryLog={summaryLog} onClose={handleCloseLog} />}
      <LottieAnimation isOpen={isLottieOpen} onClose={() => setIsLottieOpen(false)} />
    </ChatContainer>
  );
};

export default Chat;
