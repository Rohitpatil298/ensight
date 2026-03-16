import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  surveys: [],
  currentSurvey: null,
  loading: false,
  error: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSurveys: (state, action) => {
      state.surveys = action.payload;
    },
    setCurrentSurvey: (state, action) => {
      state.currentSurvey = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addSurvey: (state, action) => {
      state.surveys.push(action.payload);
    },
    updateSurvey: (state, action) => {
      const index = state.surveys.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.surveys[index] = action.payload;
      }
    },
  },
});

export const {
  setSurveys,
  setCurrentSurvey,
  setLoading,
  setError,
  addSurvey,
  updateSurvey,
} = surveySlice.actions;

export default surveySlice.reducer;
