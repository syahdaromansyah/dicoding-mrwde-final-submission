import { getUsers } from '@/network-data/network-data';
import type { TSetStatusFetch, TUsersResponse } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState: {
  users: TUsersResponse;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
} = {
  users: {
    data: {
      users: [],
    },
    message: '',
    status: '',
  },
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const { data } = await getUsers();
  return data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setStatusFetch(state, action: PayloadAction<TSetStatusFetch>) {
      const currentState = state;

      currentState.status = action.payload.status;
      currentState.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        const currentState = state;

        currentState.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const currentState = state;

        currentState.status = 'succeeded';

        currentState.users.data.users = (
          action.payload as Pick<TUsersResponse, 'data'>
        ).data.users;
        currentState.users.message = action.payload.message;
        currentState.users.status = action.payload.status;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        const currentState = state;

        currentState.status = 'failed';
        currentState.error = action.error.message;
      });
  },
});

export const { setStatusFetch } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
