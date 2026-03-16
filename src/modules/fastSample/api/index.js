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

  getDoctorRequests: async () => {
    const response = await apiClient.get('/doctor-requests');
    return response.data;
  },

  exportDoctorRequests: async () => {
    const response = await apiClient.get('/doctor-requests/export', {
      responseType: 'blob',
    });
    return response.data;
  },

  exportTodayDoctorRequests: async () => {
    const response = await apiClient.get('/doctor-requests/export-today', {
      responseType: 'blob',
    });
    return response.data;
  },

  getUsers: async (params) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (data) => {
    const response = await apiClient.post('/users', data);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  },

  exportUsers: async () => {
    const response = await apiClient.get('/users/export', {
      responseType: 'blob',
    });
    return response.data;
  },
};
