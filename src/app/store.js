import { configureStore } from '@reduxjs/toolkit';

// Temporary minimal reducer to prevent configureStore error while other slices load
const noopReducer = (state = {}, action) => state;

export const store = configureStore({
  reducer: {
    // Keep at least one reducer registered. Replace or extend with real reducers.
    noop: noopReducer,
    // example: exampleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
