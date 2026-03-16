import apiClient from '../../../core/api/client';

export const surveyApi = {
  getSurveys: async () => {
    const response = await apiClient.get('/surveys');
    return response.data;
  },

  getSurveyById: async (id) => {
    const response = await apiClient.get(`/surveys/${id}`);
    return response.data;
  },

  createSurvey: async (data) => {
    const response = await apiClient.post('/surveys', data);
    return response.data;
  },

  addDoctor: async (data) => {
    const response = await apiClient.post('/surveys/doctors', data);
    return response.data;
  },

  getAgreements: async () => {
    const response = await apiClient.get('/surveys/agreements');
    return response.data;
  },

  submitAgreement: async (data) => {
    const response = await apiClient.post('/surveys/agreements', data);
    return response.data;
  },
};
