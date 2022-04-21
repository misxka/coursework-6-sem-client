import { createSlice } from '@reduxjs/toolkit';

export interface ModeState {
  value: boolean;
}

const initialState: ModeState = {
  value: false
};

export const gameStartedSlice = createSlice({
  name: 'gameStarted',
  initialState,
  reducers: {
    toggle: state => {
      state.value = !state.value;
    }
  }
});

export const { toggle } = gameStartedSlice.actions;

export default gameStartedSlice.reducer;
