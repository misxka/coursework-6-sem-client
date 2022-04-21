import { createSlice } from '@reduxjs/toolkit';

export interface ModeState {
  value: boolean[];
}

const initialState: ModeState = {
  value: new Array().fill(false)
};

export const guessedSlice = createSlice({
  name: 'guessed',
  initialState,
  reducers: {
    erase: state => {
      state.value = new Array().fill(false);
    }
  }
});

export const { erase } = guessedSlice.actions;

export default guessedSlice.reducer;
