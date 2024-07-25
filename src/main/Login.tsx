import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { OwnglyphFont } from './mainstyles';
import { signupUser } from './signupAPI';
import { loginUser } from './loginAPI';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showFieldErrorModal, setShowFieldErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage('이메일 형식으로 입력해주세요.');
      setShowErrorModal(true);
      return;
    }

    if (email && nickname && password) {
      try {
        await signupUser({ email, nickname, password });
        setShowRegisterModal(false);
        setShowCompleteModal(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
        } else {
          setErrorMessage('회원가입 중 오류가 발생했습니다.');
        }
        setShowErrorModal(true);
      }
    } else {
      setShowFieldErrorModal(true);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email: loginEmail, password: loginPassword });
      console.log('Login successful:', response); // 응답 확인
      localStorage.setItem('accessToken', response.accessToken); // 토큰을 로컬 저장소에 저장
      localStorage.setItem('refreshToken', response.refreshToken); // 리프레시 토큰을 로컬 저장소에 저장
      navigate('/select'); // 이동할 페이지 경로
    } catch (error) {
      setErrorMessage('이메일 또는 비밀번호가 잘못되었습니다.');
      setShowErrorModal(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <PageContainer>
      <NicknameSection>
        <div style={{ marginTop: '40px', marginBottom: '60px', textAlign: 'center' }}>
          <FadeInText>잠깐!</FadeInText>
          <div style={{margin:'25px'}}/>
          <FadeInText>저는 아직 당신이 어떤 사람인지 몰라요.</FadeInText>
          <div style={{margin:'25px'}}/>
          <FadeInText>저에게 당신에 대한 정보를 알려주시겠어요?</FadeInText>
        </div>
      </NicknameSection>
      
      <FormContainer>
        <ButtonRow>
          <LoginButton onClick={() => setShowLoginModal(true)}>로그인</LoginButton>
          <RegisterButton onClick={() => setShowRegisterModal(true)}>회원가입</RegisterButton>
        </ButtonRow>
      </FormContainer>

      {showLoginModal && (
        <Modal>
        <ModalContent>
          <h2>로그인</h2>
          <RegisterForm>
            <StyledInput 
              type="email" 
              placeholder="이메일" 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)} 
              onKeyPress={handleKeyPress} 
            />
            <StyledInput 
              type="password" 
              placeholder="PW" 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)} 
              onKeyPress={handleKeyPress} 
            />
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
            <CloseButton onClick={() => setShowLoginModal(false)}>닫기</CloseButton>
          </RegisterForm>
        </ModalContent>
      </Modal>
      )}

      {showRegisterModal && (
        <Modal>
          <ModalContent>
            <h2>회원가입</h2>
            <RegisterForm>
              <StyledInput 
                type="email" 
                placeholder="이메일" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <StyledInput 
                type="text" 
                placeholder="닉네임" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
              />
              <StyledInput 
                type="password" 
                placeholder="PW" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <RegisterButton onClick={handleRegister}>회원가입</RegisterButton>
              <CloseButton onClick={() => setShowRegisterModal(false)}>닫기</CloseButton>
            </RegisterForm>
          </ModalContent>
        </Modal>
      )}

      {showErrorModal && (
        <Modal>
          <ModalContent>
            <h2>오류</h2>
            <p>{errorMessage}</p>
            <CloseButton onClick={() => setShowErrorModal(false)}>닫기</CloseButton>
          </ModalContent>
        </Modal>
      )}

      {showCompleteModal && (
        <Modal>
          <ModalContent>
            <h2>회원가입 완료</h2>
            <p>회원가입이 완료되었습니다. 이제 로그인해 주세요.</p>
            <CloseButton onClick={() => setShowCompleteModal(false)}>닫기</CloseButton>
          </ModalContent>
        </Modal>
      )}

      {showFieldErrorModal && (
        <Modal>
          <ModalContent>
            <h2>오류</h2>
            <p>모든 필드를 입력해주세요.</p>
            <CloseButton onClick={() => setShowFieldErrorModal(false)}>닫기</CloseButton>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default LoginPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: transparent; 
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent; 
  border-radius: 30px;
  padding: 50px;
  width: 400px;
  position: relative;
  z-index: 10;
  margin-top: 100%; 

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 95%;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: 120%;
  height: 5.5vh;
  gap: 100px; 
  padding: 100px;
`;

const LoginButton = styled.button`
  background-color: #4497C3;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 50px;
  font-size: clamp(14px, 2vw, 20px);
  cursor: pointer;
  font-family: 'Ownglyph_ryuttung-Rg', sans-serif; 
  flex: 1;

  &:hover {
    background-color: #226589;
  }
`;

const RegisterButton = styled(LoginButton)`
  background-color: #415161;

  &:hover {
    background-color: #2E3B48;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalContent = styled.div`
  background-color: #D4E3F2;
  color: #150052;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-sizing: border-box;
`;

const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; 
  width: 100%;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: clamp(14px, 3vw, 20px);
  margin: 10px 0;
  width: 100%;
  outline: none;
  font-family: 'Ownglyph_ryuttung-Rg', sans-serif; 
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  background-color: #B1B1B1;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  font-family: 'Ownglyph_ryuttung-Rg', sans-serif; 

  &:hover {
    background-color: #656565;
  }
`;

const NicknameSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40%;
  width: 100%;
  text-align: center;
  z-index: 5;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FadeInText = styled(OwnglyphFont)`
  animation: ${fadeIn} 1s ease-in-out;
`;
