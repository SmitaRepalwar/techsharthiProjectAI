import axios from 'axios';

const API_BASE_URL = process.env.URL || 'http://127.0.0.1:5000/api';

export const sendMessageToApi = async (messages) => {
  const response = await axios.post(`${API_BASE_URL}/chat`, { messages });
  return response.data;
};

export const uploadFileToApi = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData);
  return response.data;
};
  