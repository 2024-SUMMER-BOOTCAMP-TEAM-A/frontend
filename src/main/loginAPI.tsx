import axios from 'axios';

const LOGIN_URL = 'http://localhost:8000/api/v1/users/login';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  nickname: string;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(LOGIN_URL, data);
    return response.data;
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    throw error;
  }
};
