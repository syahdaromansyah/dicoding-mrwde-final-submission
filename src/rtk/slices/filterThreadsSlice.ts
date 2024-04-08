import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TFilterThreads = {
  filterThreads: string;
};

export const initialState: {
  filterThreads: string;
} = {
  filterThreads: '',
};

export const filterThreadsSlice = createSlice({
  name: 'filterThreads',
  initialState,
  reducers: {
    setFilterThreads(state, action: PayloadAction<TFilterThreads>) {
      const { filterThreads } = action.payload;

      const currentState = state;

      currentState.filterThreads = filterThreads;
    },
  },
});

export const { setFilterThreads } = filterThreadsSlice.actions;

export const selectFilterThreads = (state: RootState) => state.filterThreads;

export default filterThreadsSlice.reducer;
