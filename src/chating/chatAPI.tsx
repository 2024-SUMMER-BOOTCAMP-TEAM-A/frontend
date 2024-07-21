import axios from 'axios';

const API_URL = 'https://person-a.site:8000/api/v1/userSelections';
// const API_URL = 'http://localhost:8000/api/v1/userSelections';

export const selectPersona = async (): Promise<string> => {
    const response = await axios.post<{ id: string }>(`${API_URL}/`);
    return response.data.id;
};