import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    },
    update: (state, action: PayloadAction<number>) => {
      state.value[action.payload] = true;
      state.value = [...state.value];
    }
  }
});

export const { erase, update } = guessedSlice.actions;

export default guessedSlice.reducer;
