import { getThreads } from '@/network-data/network-data';
import type { TSetStatusFetch, TThreadsResponse } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TSetVoteThread = {
  threadId: string;
  profileId: string;
};

const initialState: {
  threads: TThreadsResponse;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
} = {
  threads: {
    data: {
      threads: [],
    },
    message: '',
    status: '',
  },
  status: 'idle',
  error: null,
};

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async () => {
    const { data } = await getThreads();
    return data;
  },
);

export const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setUpVoteThread(state, action: PayloadAction<TSetVoteThread>) {
      const { threadId, profileId } = action.payload;

      const foundedThread = state.threads.data.threads.find(
        (thread) => thread.id === threadId,
      );

      if (foundedThread) {
        foundedThread.upVotesBy.push(profileId);

        foundedThread.downVotesBy = foundedThread.downVotesBy.filter(
          (downVoteBy) => downVoteBy !== profileId,
        );
      }
    },
    setDownVoteThread(state, action: PayloadAction<TSetVoteThread>) {
      const { threadId, profileId } = action.payload;

      const foundedThread = state.threads.data.threads.find(
        (thread) => thread.id === threadId,
      );

      if (foundedThread) {
        foundedThread.downVotesBy.push(profileId);

        foundedThread.upVotesBy = foundedThread.upVotesBy.filter(
          (upVoteBy) => upVoteBy !== profileId,
        );
      }
    },
    setNeutralVoteThread(state, action: PayloadAction<TSetVoteThread>) {
      const { threadId, profileId } = action.payload;

      const { threads } = state.threads.data;

      const foundedThread = threads.find((thread) => thread.id === threadId);

      if (foundedThread) {
        foundedThread.upVotesBy = foundedThread.upVotesBy.filter(
          (upVoteBy) => upVoteBy !== profileId,
        );

        foundedThread.downVotesBy = foundedThread.downVotesBy.filter(
          (downVoteBy) => downVoteBy !== profileId,
        );
      }
    },
    setStatusFetch(state, action: PayloadAction<TSetStatusFetch>) {
      state.status = action.payload.status;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.threads.data.threads = (
          action.payload as Pick<TThreadsResponse, 'data'>
        ).data.threads;

        state.threads.message = action.payload.message;
        state.threads.status = action.payload.status;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setUpVoteThread,
  setDownVoteThread,
  setNeutralVoteThread,
  setStatusFetch,
} = threadsSlice.actions;

export const selectThreads = (state: RootState) => state.threads;

export default threadsSlice.reducer;
