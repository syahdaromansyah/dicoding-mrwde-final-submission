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
      const currentState = state;

      currentState.status = action.payload.status;
      currentState.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLeaderBoards.pending, (state) => {
        const currentState = state;

        currentState.status = 'loading';
      })
      .addCase(fetchLeaderBoards.fulfilled, (state, action) => {
        const currentState = state;

        currentState.status = 'succeeded';

        currentState.leaderBoards.data.leaderboards = (
          action.payload as Pick<TLeaderBoardsResponse, 'data'>
        ).data.leaderboards;

        currentState.leaderBoards.message = action.payload.message;
        currentState.leaderBoards.status = action.payload.status;
      })
      .addCase(fetchLeaderBoards.rejected, (state, action) => {
        const currentState = state;

        currentState.status = 'failed';
        currentState.error = action.error.message;
      });
  },
});

export const { setStatusFetch } = leaderBoardsSlice.actions;

export const selectLeaderBoards = (state: RootState) => state.leaderBoards;

export default leaderBoardsSlice.reducer;
