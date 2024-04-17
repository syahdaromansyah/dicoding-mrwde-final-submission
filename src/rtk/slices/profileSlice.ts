import { getProfile } from '@/network-data/network-data';
import type { TProfileResponse, TSetStatusFetch } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TProfilePayloadAction = {
  profile: {
    data: {
      user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
      };
    };
    message: string;
    status: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const initialState: {
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
    setProfile(state, action: PayloadAction<TProfilePayloadAction>) {
      const currentState = state;

      const { profile, status, error } = action.payload;

      currentState.profile.data.user.id = profile.data.user.id;
      currentState.profile.data.user.name = profile.data.user.name;
      currentState.profile.data.user.email = profile.data.user.email;
      currentState.profile.data.user.avatar = profile.data.user.avatar;

      currentState.profile.message = profile.message;
      currentState.profile.status = profile.status;

      currentState.status = status;
      currentState.error = error;
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

export const { setProfile, setStatusFetch } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
