import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/persons';

interface PersonaDetails {
  id: string;
  name: string;
  title: string;
}

export const fetchPersonaDetails = async (personaId: string): Promise<PersonaDetails> => {
  try {
    const response = await axios.get<PersonaDetails>(`${API_URL}/${personaId}`);
    return response.data;
  } catch (error) {
    console.error('캐릭터 세부 정보를 가져오는 중 오류 발생:', error);
    throw error;
  }
};
