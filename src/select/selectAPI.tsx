import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/persons';

interface Persona {
  id: string;
  name: string;
  title: string;
}

export const fetchPersonas = async (): Promise<Persona[]> => {
  try {
    const response = await axios.get<Persona[]>(API_URL);
    console.log('API Response:', response.data); // API 응답을 로그에 출력
    return response.data;
  } catch (error) {
    console.error('인격 카드 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};
