import apiClient from '../../../core/api/client';

export const adminApi = {
  getDivisions: async () => {
    const response = await apiClient.get('/admin/division-listing');
    return response.data;
  },

  getDashboardResponse: async () => {
    const response = await apiClient.get(`/admin/dashboard`);
    return response.data;
  },


  createDivision: async (data) => {
    const response = await apiClient.post('/divisions', data);
    return response.data;
  },

  updateDivision: async (id, data) => {
    const response = await apiClient.put(`/divisions/${id}`, data);
    return response.data;
  },

  deleteDivision: async (id) => {
    const response = await apiClient.delete(`/divisions/${id}`);
    return response.data;
  },

  assignModule: async (data) => {
    const response = await apiClient.post('/modules/assign', data);
    return response.data;
  },

  // Doctor Dashboard APIs
  getDoctorResponses: async (surveyId) => {
    const response = await apiClient.get(`/doctors/responses`, {
      params: { surveyId },
    });
    return response.data;
  },

  getRegionWiseSummary: async (surveyId) => {
    const response = await apiClient.get(`/doctors/region-summary`, {
      params: { surveyId },
    });
    return response.data;
  },

  downloadDoctorCSV: async (surveyId) => {
    const response = await apiClient.get(`/doctors/csv`, {
      params: { surveyId },
      responseType: 'blob',
    });
    return response.data;
  },

  downloadAllSurveyCSV: async () => {
    const response = await apiClient.get(`/doctors/all-csv`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Doctor Management APIs
  getDoctors: async () => {
    const response = await apiClient.get('/doctors');
    return response.data;
  },

  getDoctorByUin: async (uin) => {
    const response = await apiClient.get(`/doctors/${uin}`);
    return response.data;
  },

  createDoctor: async (data) => {
    const response = await apiClient.post('/doctors', data);
    return response.data;
  },

  updateDoctor: async (uin, data) => {
    const response = await apiClient.put(`/doctors/${uin}`, data);
    return response.data;
  },

  deleteDoctor: async (uin) => {
    const response = await apiClient.delete(`/doctors/${uin}`);
    return response.data;
  },

  getDoctorsInUser: async () => {
    const response = await apiClient.get('/doctors/in-user');
    return response.data;
  },
};
