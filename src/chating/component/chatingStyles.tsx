import styled, {keyframes} from 'styled-components';
import closeIcon from '../../assets/svg/closeIcon.svg';
import sendIcon from '../../assets/svg/send.svg';
import micIcon from '../../assets/svg/mic.svg';

// 채팅 메시지를 감싸는 전체 컨테이너
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  border: 1px solid #ddd;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #020107 0%, #201b46 100%);
`;

// 상단 바
export const CharacterProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 100px;
  border-bottom: 1px solid #ddd;
  height: 40px;
  border: none;
`;

// 종료 버튼
export const CloseButton = styled.button`
    position: absolute;
    top: 35px;
    right: 100px;
    background-color: #9B86BD;
    background-image: url(${closeIcon});
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: 30%;
    display: felx;
    overflow: hidden;
    margin-left: auto;
    align-items: center;
`;

// 캐릭터 이름
export const ProfileName = styled.div`
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

// 채팅창 부분
export const ChatBox = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 50%;
  height: calc(100vh - 150px);  /* 채팅창의 높이를 설정합니다 */
  margin: 0 auto;
  box-sizing: border-box;
  padding: 10px 0px;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 말풍선 등장 시 위로 올라가는 애니메이션
const appearAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);  /* 처음에는 아래쪽에서 시작 */
  }
  100% {
    opacity: 1;
    transform: translateY(0);  /* 최종적으로 원래 위치로 */
  }
`;

// 캐릭터 채팅 메시지창
export const CharacterChat = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  align-items: flex-end;
`;

// 캐릭터 채팅 메시지 내용
export const CharacterChatContent = styled.div`
  max-width: 70%;
  word-wrap: break-word;
  background: #a1f5fe;
  padding: 5px 10px;
  position: relative;
  height: auto;
  display: inline-block;
  padding-bottom: 15px;
  box-shadow: 2px 2px 20px -2px rgba(255,255,255,0.8);
  color: rgba(0,0,0,1);
  border-radius: 15px 15px 15px 2px;
  font-size: 15px;
  animation: ${appearAnimation} 0.5s ease-out;
`;

// 유저 채팅 메시지창
export const UserChat = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
`;

// 유저 채팅 메시지 내용
export const UserChatContent = styled.div`
  max-width: 70%;
  word-wrap: break-word;
  background: #e1f5fe;
  padding: 5px 10px;
  position: relative;
  height: auto;
  display: inline-block;
  padding-bottom: 15px;
  box-shadow: 2px 2px 20px -2px rgba(255,255,255,0.8);
  color: rgba(60,51,176,1);
  border-radius: 15px 15px 2px 15px;
  font-size: 15px;
  animation: ${appearAnimation} 0.5s ease-out;
`;

// 캐릭터 프로필 사진
export const CharacterAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;  // 이미지 비율 유지하며 크롭
  object-position: 0% 20%;
  margin-right: 20px;
`;

// 캐릭터의 메시지 왼쪽 정렬
export const CharacterMessage = styled.div`
  text-align: left;
`;

// 유저의 메시지 오른쪽 정렬
export const UserMessage = styled.div`
  text-align: right;
`;

// 입력 바
export const UserInputCon = styled.div`
  width: 50%;
  height: 70px;
  padding: 10px;
  border-top: 1px solid #ddd;
  display: flex;
  box-sizing: border-box;
  margin: 0 auto;
  border: none;
  margin-bottom: 40px;
  opacity: 0.9;
  margin-top: auto;
`;

// 입력창
export const InputMessage = styled.input`
  flex: 1;  /* 버튼 공간을 제외한 나머지 너비를 차지 */
  padding: 10px;
  border: 1px solid #ddd;  /* 테두리 설정 */
  border-radius: 5px;  /* 모서리 둥글게 */
  font-size: 14px;
`;

// 전송버튼
export const SendButton = styled.button`
  width: 50px;
  height: 50px;
  background: #000000;  /* 배경색 설정 */
  border: none;  /* 테두리 없음 */
  border-radius: 5px;  /* 원형 모양으로 설정 */
  cursor: pointer;  /* 커서 모양 */
  margin-left: 10px;
  background-image: url(${sendIcon});
  background-size: 40px 40px;  /* 아이콘의 크기 조절 */
  background-position: center;  /* 아이콘을 버튼의 중앙에 배치 */
  background-repeat: no-repeat;  /* 아이콘 반복하지 않음 */
  display: flex;
  align-items: center;  /* 버튼 내 아이콘의 수직 정렬 */
  justify-content: center;  /* 버튼 내 아이콘의 수평 정렬 */
  font-size: 0;  /* 버튼 텍스트를 제거하여 아이콘만 보이도록 합니다 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);  /* 버튼에 그림자 효과 추가 */
  transition: background-color 0.3s;  /* 배경색 변화에 부드러운 전환 효과 추가 */
`;

// 녹음버튼
export const MicButton = styled.button`
  width: 50px;
  height: 50px;
  background: #000000;  /* 배경색 설정 */
  border: none;  /* 테두리 없음 */
  border-radius: 5px;  /* 원형 모양으로 설정 */
  cursor: pointer;  /* 커서 모양 */
  margin-left: 10px;
  background-image: url(${micIcon});
  background-size: 40px 40px;  /* 아이콘의 크기 조절 */
  background-position: center;  /* 아이콘을 버튼의 중앙에 배치 */
  background-repeat: no-repeat;  /* 아이콘 반복하지 않음 */
  display: flex;
  align-items: center;  /* 버튼 내 아이콘의 수직 정렬 */
  justify-content: center;  /* 버튼 내 아이콘의 수평 정렬 */
  font-size: 0;  /* 버튼 텍스트를 제거하여 아이콘만 보이도록 합니다 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);  /* 버튼에 그림자 효과 추가 */
  transition: background-color 0.3s;  /* 배경색 변화에 부드러운 전환 효과 추가 */
`;

// 알람창 전체화면
export const AlertOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

// 알람창
export const AlertBox = styled.div`
    background: #C4C0D2;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    color: #295180;
`;

// 버튼 자리
export const AlertButtons = styled.div`
    margin-top: 20px;
`;

// 취소 버튼
export const AlertButtonCancle = styled.button`
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #FFFFFF;
    color: #000000;
    cursor: pointer;

    &:hover {
        background: #CBCBCB;
    }
`;

// 종료 버튼
export const AlertButtonFinish = styled.button`
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #FF6464;
    color: white;
    cursor: pointer;

    &:hover {
        background: #DA1B1B;
    }
`;

export default CloseButton;