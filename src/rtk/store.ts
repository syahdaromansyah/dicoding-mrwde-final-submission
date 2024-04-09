import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice.ts';
import filterThreadsReducer from './slices/filterThreadsSlice.ts';
import leaderBoardsReducer from './slices/leaderBoardsSlice.ts';
import profileReducer from './slices/profileSlice.ts';
import threadReducer from './slices/threadSlice.ts';
import threadsReducer from './slices/threadsSlice.ts';
import usersReducer from './slices/usersSlice.ts';

const rootReducer = combineReducers({
  alert: alertReducer,
  filterThreads: filterThreadsReducer,
  profile: profileReducer,
  threads: threadsReducer,
  thread: threadReducer,
  users: usersReducer,
  leaderBoards: leaderBoardsReducer,
});

// eslint-disable-next-line no-use-before-define
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
