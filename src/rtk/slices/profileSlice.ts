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
      const { profile, status, error } = action.payload;

      state.profile.data.user.id = profile.data.user.id;
      state.profile.data.user.name = profile.data.user.name;
      state.profile.data.user.email = profile.data.user.email;
      state.profile.data.user.avatar = profile.data.user.avatar;

      state.profile.message = profile.message;
      state.profile.status = profile.status;

      state.status = status;
      state.error = error;
    },
    setStatusFetch(state, action: PayloadAction<TSetStatusFetch>) {
      state.status = action.payload.status;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.profile.data.user = (
          action.payload as Pick<TProfileResponse, 'data'>
        ).data.user;

        state.profile.message = action.payload.message;
        state.profile.status = action.payload.status;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setProfile, setStatusFetch } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
