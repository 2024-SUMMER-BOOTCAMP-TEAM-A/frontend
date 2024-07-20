import axios from 'axios';

const API_URL = 'http://34.83.113.214:8000/api/v1/persons';
// const API_URL = 'http://localhost:8000/api/v1/persons';

export interface Person {
  id: number;
  name: string;
  count: number;
}

export const getPersonsByCountDesc = async (): Promise<Person[]> => {
  const response = await axios.get<Person[]>(`${API_URL}/records/counts`);
  return response.data;
};