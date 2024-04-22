import { getProfile } from '@/network-data/network-data';
import type { TProfileResponse, TSetStatusFetch } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const initialState: {
  profile: TProfileResponse;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
} = {
  profile: {
    data: {
      user: {
        id: '',
        name: '',
        email: '',
        avatar: '',
      },
    },
    message: '',
    status: '',
  },
  status: 'idle',
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const { data } = await getProfile();
    return data;
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile(state) {
      const currentState = state;

      currentState.profile.data.user.id = '';
      currentState.profile.data.user.name = '';
      currentState.profile.data.user.email = '';
      currentState.profile.data.user.avatar = '';

      currentState.profile.message = '';
      currentState.profile.status = '';

      currentState.status = 'idle';
      currentState.error = null;
    },
    setStatusFetch(state, action: PayloadAction<TSetStatusFetch>) {
      const currentState = state;

      currentState.status = action.payload.status;
      currentState.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state) => {
        const currentState = state;

        currentState.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const currentState = state;

        currentState.status = 'succeeded';

        currentState.profile.data.user = (
          action.payload as Pick<TProfileResponse, 'data'>
        ).data.user;

        currentState.profile.message = action.payload.message;
        currentState.profile.status = action.payload.status;

        currentState.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        const currentState = state;

        currentState.status = 'failed';
        currentState.error = action.error.message;
      });
  },
});

export const { resetProfile, setStatusFetch } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
