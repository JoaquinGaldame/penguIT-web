import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  AuthState,
  LoginResponse,
} from '../types/Auth.types';

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (
      state,
      action: PayloadAction<LoginResponse>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    clearSession: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;

export const authReducer = authSlice.reducer;