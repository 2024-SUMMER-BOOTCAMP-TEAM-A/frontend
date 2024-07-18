import axios from 'axios';

const SIGNUP_URL = 'http://localhost:8000/api/v1/users/signup';

interface SignupData {
  email: string;
  nickname: string;
  password: string;
}

export const signupUser = async (data: SignupData): Promise<void> => {
  try {
    const response = await axios.post(SIGNUP_URL, data);
    console.log('회원가입 성공:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('회원가입 중 오류 발생:', error.response?.data || error.message);
    } else {
      console.error('회원가입 중 오류 발생:', error);
    }
    throw error;
  }
};
