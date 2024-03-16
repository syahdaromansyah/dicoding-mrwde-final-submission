import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice.ts';
import filterThreadsReducer from './slices/filterThreadsSlice.ts';
import leaderBoardsReducer from './slices/leaderBoardsSlice.ts';
import profileReducer from './slices/profileSlice.ts';
import threadReducer from './slices/threadSlice.ts';
import threadsReducer from './slices/threadsSlice.ts';
import usersReducer from './slices/usersSlice.ts';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    filterThreads: filterThreadsReducer,
    profile: profileReducer,
    threads: threadsReducer,
    thread: threadReducer,
    users: usersReducer,
    leaderBoards: leaderBoardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
