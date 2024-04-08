import { getThread } from '@/network-data/network-data';
import type { TSetStatusFetch, TThreadResponse } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TSetVoteThread = {
  profileId: string;
};

type TSetVoteComment = {
  profileId: string;
  commentId: string;
};

type TAddComment = {
  id: string;
  content: string;
  createdAt: string;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  upVotesBy: string[];
  downVotesBy: string[];
};

export const initialState: {
  thread: TThreadResponse;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
} = {
  thread: {
    data: {
      detailThread: {
        id: '',
        title: '',
        body: '',
        category: '',
        createdAt: '',
        owner: {
          id: '',
          name: '',
          avatar: '',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      },
    },
    message: '',
    status: '',
  },
  status: 'idle',
  error: null,
};

export const fetchThread = createAsyncThunk(
  'thread/fetchThread',
  async (threadId: string) => {
    const { data } = await getThread(threadId);
    return data;
  },
);

export const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    setUpVoteThread(state, action: PayloadAction<TSetVoteThread>) {
      const { profileId } = action.payload;

      const { detailThread } = state.thread.data;

      detailThread.upVotesBy.push(profileId);

      detailThread.downVotesBy = detailThread.downVotesBy.filter(
        (downVoteBy) => downVoteBy !== profileId,
      );
    },
    setDownVoteThread(state, action: PayloadAction<TSetVoteThread>) {
      const { profileId } = action.payload;

      const { detailThread } = state.thread.data;

      detailThread.downVotesBy.push(profileId);

      detailThread.upVotesBy = detailThread.upVotesBy.filter(
        (upVoteBy) => upVoteBy !== profileId,
      );
    },
    setNeutralVoteThread(state, action: PayloadAction<TSetVoteThread>) {
      const { profileId } = action.payload;

      const { detailThread } = state.thread.data;

      detailThread.upVotesBy = detailThread.upVotesBy.filter(
        (upVoteBy) => upVoteBy !== profileId,
      );

      detailThread.downVotesBy = detailThread.downVotesBy.filter(
        (downVoteBy) => downVoteBy !== profileId,
      );
    },
    setUpVoteComment(state, action: PayloadAction<TSetVoteComment>) {
      const { profileId, commentId } = action.payload;

      const { detailThread } = state.thread.data;

      const foundedComment = detailThread.comments.find(
        (comment) => comment.id === commentId,
      );

      if (foundedComment) {
        foundedComment.upVotesBy.push(profileId);

        foundedComment.downVotesBy = foundedComment.downVotesBy.filter(
          (downVoteBy) => downVoteBy !== profileId,
        );
      }
    },
    setDownVoteComment(state, action: PayloadAction<TSetVoteComment>) {
      const { profileId, commentId } = action.payload;

      const { detailThread } = state.thread.data;

      const foundedComment = detailThread.comments.find(
        (comment) => comment.id === commentId,
      );

      if (foundedComment) {
        foundedComment.downVotesBy.push(profileId);

        foundedComment.upVotesBy = foundedComment.upVotesBy.filter(
          (upVoteBy) => upVoteBy !== profileId,
        );
      }
    },
    setNeutralVoteComment(state, action: PayloadAction<TSetVoteComment>) {
      const { profileId, commentId } = action.payload;

      const { detailThread } = state.thread.data;

      const foundedComment = detailThread.comments.find(
        (comment) => comment.id === commentId,
      );

      if (foundedComment) {
        foundedComment.upVotesBy = foundedComment.upVotesBy.filter(
          (upVoteBy) => upVoteBy !== profileId,
        );

        foundedComment.downVotesBy = foundedComment.downVotesBy.filter(
          (downVoteBy) => downVoteBy !== profileId,
        );
      }
    },
    setComment(state, action: PayloadAction<TAddComment>) {
      const currentState = state;

      const { id, content, createdAt, owner, upVotesBy, downVotesBy } =
        action.payload;

      currentState.thread.data.detailThread.comments = [
        {
          id,
          content,
          createdAt,
          owner,
          upVotesBy,
          downVotesBy,
        },
        ...state.thread.data.detailThread.comments,
      ];
    },
    setStatusFetch(state, action: PayloadAction<TSetStatusFetch>) {
      const currentState = state;

      currentState.status = action.payload.status;
      currentState.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchThread.pending, (state) => {
        const currentState = state;

        currentState.status = 'loading';
      })
      .addCase(fetchThread.fulfilled, (state, action) => {
        const currentState = state;

        currentState.status = 'succeeded';

        currentState.thread.data.detailThread = (
          action.payload as Pick<TThreadResponse, 'data'>
        ).data.detailThread;

        currentState.thread.message = action.payload.message;
        currentState.thread.status = action.payload.status;
      })
      .addCase(fetchThread.rejected, (state, action) => {
        const currentState = state;

        currentState.status = 'failed';
        currentState.error = action.error.message;
      });
  },
});

export const {
  setUpVoteThread,
  setDownVoteThread,
  setNeutralVoteThread,
  setUpVoteComment,
  setDownVoteComment,
  setNeutralVoteComment,
  setComment,
  setStatusFetch,
} = threadSlice.actions;

export const selectThread = (state: RootState) => state.thread;

export default threadSlice.reducer;
