import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/v1/userSelections';
const API_URL = 'https://person-a.site/api/v1/userSelections';

interface SaveUserSelectionData {
  personId: number;
}

export const saveUserSelection = async (personId: number): Promise<void> => {
  try {

    // const response = await axios.get<Persona[]>(API_URL);
    // return response.data;

    const data: SaveUserSelectionData = { personId };
    await axios.post(API_URL, data);
    console.log('UserSelection saved successfully'); 

  } catch (error) {
    console.error('Error saving user selection:', error);
    throw error;
  }
};