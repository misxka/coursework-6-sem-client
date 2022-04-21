import { createSlice } from '@reduxjs/toolkit';

export interface ModeState {
  value: boolean;
}

const initialState: ModeState = {
  value: false
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    toggle: state => {
      state.value = !state.value;
    }
  }
});

export const { toggle } = modeSlice.actions;

export default modeSlice.reducer;
