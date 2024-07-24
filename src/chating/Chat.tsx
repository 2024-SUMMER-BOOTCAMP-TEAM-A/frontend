import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import socket from './socket';
import {
  UPCharacterProfile, ChatingBox, UserInputBox, CustomAlert, LogModal
} from './ChatComponents';
import { Stars, Stars1, Stars2 } from '../assets/styles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';
import { Character } from '../assets/initCharacter';
import { ChatContainer } from './component/chatingStyles';
import LoadingModal from './component/LoadingModal';

interface Message {
  sender: string;
  message: string;
}

interface ChatProps {
  initialCharacter: Character;
}

const Chat: React.FC<ChatProps> = ({ initialCharacter }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatLogId, setChatLogId] = useState<string>('');
  const [summaryLogId, setSummaryLogId] = useState<string>(''); // summaryLogId 상태 추가
  const [summaryLog, setSummaryLog] = useState<any>(null); // summaryLog 상태 추가
  const messageEndRef = useRef<HTMLDivElement>(null);
  let silenceTimer: ReturnType<typeof setTimeout>;
  let mediaRecorder: MediaRecorder;

  const { nickname } = useParams<{ nickname: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const character = location.state?.character || initialCharacter;

  useEffect(() => {
    console.log('Selected character:', character);
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
  }, [nickname]);

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
    };

    mediaRecorder.start(250);
    socket.emit('start stt');
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
      const response = await axios.post('http://person-a.site/api/v1/logs/summary', { chatLogId });
      //const response = await axios.post('http://localhost:8000/api/v1/logs/summary', { chatLogId });
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
      const response = await axios.get(`http://person-a.site/api/v1/logs/summary/${summaryLogId}`);
      //const response = await axios.get(`http://localhost:8000/api/v1/logs/summary/${summaryLogId}`);
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
      <UPCharacterProfile name={character.name} onClose={handleCloseChat} fontFamily={character.fontFamily} />
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
      {isLogOpen && summaryLogId && <LogModal character={character} nickname={nickname} summaryLogId={summaryLogId} onClose={handleCloseLog} />}
      {isLoading && <LoadingModal />}
    </ChatContainer>
  );
};

export default Chat;
