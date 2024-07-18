import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { OwnglyphFont } from './mainstyles';
import { signupUser } from './signupAPI';
import { loginUser } from './loginAPI';
import axios from 'axios';

const LoginPage: React.FC = () => {
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

  // 이메일 형식 검사 함수
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 회원가입 처리 함수
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
        setShowCompleteModal(true); // 회원가입 완료 모달 표시
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
        } else {
          setErrorMessage('회원가입 중 오류가 발생했습니다.');
        }
        setShowErrorModal(true);
      }
    } else {
      setShowFieldErrorModal(true); // 모든 필드 입력 요구 모달 표시
    }
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      const response = await loginUser({ email: loginEmail, password: loginPassword });
      localStorage.setItem('token', response.token); // 토큰을 로컬 저장소에 저장
      navigate(`/select/${response.nickname}`);
    } catch (error) {
      setErrorMessage('이메일 또는 비밀번호가 잘못되었습니다.');
      setShowErrorModal(true);
    }
  };

  // Enter 키 누를 때 로그인 처리
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <PageContainer>
      {/* 닉네임 섹션 */}
      <NicknameSection>
        <div style={{ marginTop: '40px', marginBottom: '60px', textAlign: 'center' }}>
          <FadeInText>
            잠깐! 아직 이름을 안 물어봤네요.
          </FadeInText>
        </div>
        <FadeInText>
          어떻게 불러드릴까요? 닉네임을 알려주세요!
        </FadeInText>
      </NicknameSection>
      
      {/* 로그인 폼 */}
      <FormContainer>
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
        <ButtonRow>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <RegisterButton onClick={() => setShowRegisterModal(true)}>회원가입</RegisterButton>
        </ButtonRow>
      </FormContainer>

      {/* 회원가입 모달 */}
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

      {/* 오류 메시지 모달 */}
      {showErrorModal && (
        <Modal>
          <ModalContent>
            <h2>오류</h2>
            <p>{errorMessage}</p>
            <CloseButton onClick={() => setShowErrorModal(false)}>닫기</CloseButton>
          </ModalContent>
        </Modal>
      )}

      {/* 회원가입 완료 모달 */}
      {showCompleteModal && (
        <Modal>
          <ModalContent>
            <h2>회원가입 완료</h2>
            <p>회원가입이 완료되었습니다. 이제 로그인해 주세요.</p>
            <CloseButton onClick={() => setShowCompleteModal(false)}>닫기</CloseButton>
          </ModalContent>
        </Modal>
      )}

      {/* 모든 필드 입력 요구 모달 */}
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

// 스타일드 컴포넌트
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
  padding: 20px;
  width: 500px;
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
  width: 100%;
  gap: 10px; 
  margin-top: 20px;
`;

const LoginButton = styled.button`
  background-color: #3544c8;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 50px;
  font-size: clamp(14px, 2vw, 20px);
  cursor: pointer;
  font-family: 'Ownglyph_ryuttung-Rg', sans-serif; 
  flex: 1;

  &:hover {
    background-color: #2534b8;
  }
`;

const RegisterButton = styled(LoginButton)`
  background-color: #383535;

  &:hover {
    background-color: #282525;
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
  background-color: white;
  padding: 20px;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  font-family: 'Ownglyph_ryuttung-Rg', sans-serif; 

  &:hover {
    background-color: #0056b3;
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
