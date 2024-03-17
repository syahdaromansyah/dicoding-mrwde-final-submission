import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TAlertPayloadAction = {
  isShown: boolean;
  message: string;
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    isShown: false,
    message: '',
  },
  reducers: {
    setAlert(state, action: PayloadAction<TAlertPayloadAction>) {
      const { isShown, message } = action.payload;

      const currentState = state;

      currentState.isShown = isShown;
      currentState.message = message;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;
