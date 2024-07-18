import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/persons';

interface PersonaDetails {
  id: number;
  name: string;
  content: string;
}

export const fetchPersonaDetails = async (personaId: number): Promise<PersonaDetails> => {
  try {
    const response = await axios.get<PersonaDetails>(`${API_URL}/${personaId}`);
    console.log('API Response for Details:', response.data); // API 응답을 로그에 출력
    return response.data;
  } catch (error) {
    console.error('캐릭터 세부 정보를 가져오는 중 오류 발생:', error);
    throw error;
  }
};
