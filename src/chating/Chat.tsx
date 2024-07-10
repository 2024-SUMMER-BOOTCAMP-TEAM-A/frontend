import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingWaiting from './component/TypingWaiting';
import initialCharacters, {Character} from '../assets/initCharacter';
import { ReactComponent as Leftarrow } from '../assets/svg/leftarrow.svg';
import { ReactComponent as Closeicon } from '../assets/svg/closeIcon.svg';

import {
    CloseButton,
    ChatContainer,
    ChatBox,
    CharacterChat,
    UserChat,
    CharacterChatContent,
    UserChatContent,
    CharacterAvatar,
    CharacterMessage,
    UserMessage,
    CharacterProfile,
    ProfileName,
    UserInputCon,
    InputMessage,
    SendButton,
    MicButton,
    AlertOverlay,
    AlertBox,
    AlertButtons,
    AlertButtonCancle,
    AlertButtonFinish,
} from './component/chatingStyles';

import { Stars, Stars1, Stars2 } from '../assets/styles';
import ShootingStarsComponent from '../assets/ShootingStarsComponent';

// 상단바
const UPCharacterProfile: React.FC<{ name: string; onClose: () => void; fontFamily?: string }> = ({ name, onClose, fontFamily }) => {
    return (
        <CharacterProfile>
            <Leftarrow />
            <ProfileName style={ {fontFamily} }>{name}</ProfileName>
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

const CharacterChatCon: React.FC<CharacterChatContentProps> = ({ isTyping, chatEndRef, children, backgroundColor, fontFamily }) => {
    const [showText, setShowText] = useState<React.ReactNode>(null);
    const [showTyping, setShowTyping] = useState(true);

    useEffect(() => {
        if (isTyping) {
            setShowText(null);  // 타이핑 중에는 메시지를 숨깁니다.
            setShowTyping(true);  // 타이핑 애니메이션을 표시합니다.
        } else {
            const timer = setTimeout(() => {
                setShowText(children);  // 타이핑이 끝나면 2초 후에 메시지를 표시합니다.
                setShowTyping(false);  // 메시지가 표시된 후 타이핑 애니메이션을 숨깁니다.
            }, 1000);  // 2초 동안 타이핑 애니메이션 표시

            return () => clearTimeout(timer);  // 컴포넌트 언마운트 시 타이머를 정리합니다.
        }
    }, [isTyping, children]);

    useEffect(() => {
        if (showText && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [showText, chatEndRef]);

    return (
        <CharacterChatContent style={{backgroundColor, fontFamily}}>
            {showTyping ? <TypingWaiting /> : showText}
        </CharacterChatContent>
    );
};



// 채팅 창
const ChatingBox: React.FC<{ messages: { text: string; isUser: boolean }[]; isTyping: boolean; character: Character }> = ({ messages, isTyping, character }) => {
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
                            <CharacterAvatar src={character.imageSrc} alt="Character Avatar" />
                            <CharacterChatCon
                                isTyping={index === messages.length - 1 && isTyping}  // 마지막 메시지에만 isTyping을 전달
                                chatEndRef={chatEndRef}
                                backgroundColor={character.chatContentBackgroundColor}
                                fontFamily={character.FontFamily}
                            >
                                {msg.text}
                            </CharacterChatCon>
                        </CharacterChat>
                    )}
                </div>
            ))}
            <div ref={chatEndRef} />  {/* 스크롤할 위치를 표시하는 요소 */}
        </ChatBox>
    );
};


// 입력창
const UserInputBox: React.FC<{ onSend: (message: string) => void }> = ({ onSend }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // 엔터 키의 기본 동작(예: 폼 제출)을 방지합니다.
            handleSend();  // 메시지를 전송합니다.
        }
    };

    return (
        <UserInputCon>
            <InputMessage
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}  // 엔터 키 이벤트를 처리합니다.
                placeholder="메시지를 입력하세요..."
            />
            <SendButton onClick={handleSend} />
            <MicButton />
        </UserInputCon>
    );
};

// 알람창
const CustomAlert: React.FC<{ message: string; onConfirm: () => void; onCancel: () => void }> = ({ message, onConfirm, onCancel }) => {
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

// ChatProps 인터페이스 정의
interface ChatProps {
    initialCharacter: Character;
}

// Chat 컴포넌트의 props 타입 정의
const Chat: React.FC<ChatProps> = ({ initialCharacter }) => {
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 초기 메시지와 타이핑 상태를 설정합니다.
        const startChat = () => {
            setIsTyping(true);
            setMessages([
                { text: `Hi! I'm ${initialCharacter.name}. How can I help you?`, isUser: false },
            ]);
            setIsTyping(false);
        };

        startChat();
    }, [initialCharacters]);

    const handleSend = (message: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, isUser: true }
        ]);
    
        setIsTyping(true);
    
        // 타이핑 애니메이션 후 응답 메시지를 추가하도록 지연 설정
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `Here is a response to "${message}"`, isUser: false },
            ]);
            setIsTyping(false);
        }, 500);  // 1초 지연, 필요에 따라 지연 시간 조정 가능
    };
    

    const handleClose = () => {
        setIsChatOpen(false);
    };

    const handleCloseChat = () => {
        setIsAlertOpen(true); // 알림창을 엽니다.
    };

    const handleConfirmCloseChat = () => {
        handleClose();
        setIsAlertOpen(false);
        navigate('/log');
    };

    const handleCancelCloseChat = () => {
        setIsAlertOpen(false);
    };

    if (!isChatOpen) return null;

    return (
        <ChatContainer>
            <UPCharacterProfile name={initialCharacter.name} onClose={handleCloseChat} fontFamily={initialCharacter.FontFamily} />
            <ChatingBox
                messages={messages}
                isTyping={isTyping}
                character={initialCharacter}
                />
            <UserInputBox onSend={handleSend}/>
            <Stars />
            <Stars1 />
            <Stars2 />
            <ShootingStarsComponent />
            {isAlertOpen && (
                <CustomAlert
                    message="정말로 채팅을 끝내시겠습니까?"
                    onConfirm={handleConfirmCloseChat}
                    onCancel={handleCancelCloseChat}
                />
            )}
        </ChatContainer>
    );
};

export default Chat;