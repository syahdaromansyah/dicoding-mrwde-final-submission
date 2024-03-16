import { getLeaderboards } from '@/network-data/network-data';
import type { TLeaderBoardsResponse, TSetStatusFetch } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState: {
  leaderBoards: TLeaderBoardsResponse;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
} = {
  leaderBoards: {
    data: {
      leaderboards: [],
    },
    message: '',
    status: '',
  },
  status: 'idle',
  error: null,
};

export const fetchLeaderBoards = createAsyncThunk(
  'leaderBoards/fetchLeaderBoards',
  async () => {
    const { data } = await getLeaderboards();
    return data;
  },
);

export const leaderBoardsSlice = createSlice({
  name: 'leaderBoards',
  initialState,
  reducers: {
    setStatusFetch(state, action: PayloadAction<TSetStatusFetch>) {
      state.status = action.payload.status;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLeaderBoards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaderBoards.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.leaderBoards.data.leaderboards = (
          action.payload as Pick<TLeaderBoardsResponse, 'data'>
        ).data.leaderboards;

        state.leaderBoards.message = action.payload.message;
        state.leaderBoards.status = action.payload.status;
      })
      .addCase(fetchLeaderBoards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setStatusFetch } = leaderBoardsSlice.actions;

export const selectLeaderBoards = (state: RootState) => state.leaderBoards;

export default leaderBoardsSlice.reducer;
