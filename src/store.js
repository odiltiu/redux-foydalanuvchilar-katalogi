import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './featureSlice.js';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
