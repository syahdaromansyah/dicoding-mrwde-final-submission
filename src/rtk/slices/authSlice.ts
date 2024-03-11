import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TAuthPayloadAction = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: '',
    name: '',
    email: '',
    avatar: '',
  },
  reducers: {
    setAuth(state, action: PayloadAction<TAuthPayloadAction>) {
      const { id, name, email, avatar } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.avatar = avatar;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
