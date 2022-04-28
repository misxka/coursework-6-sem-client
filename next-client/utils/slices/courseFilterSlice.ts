import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilter {
  title: string;
  language: string;
  level: string;
  priceMin: number;
  priceMax: number;
  isOnline: boolean;
}

export interface FilterState {
  value: IFilter;
}

const initialState: FilterState = {
  value: {
    title: '',
    language: '',
    level: '',
    priceMin: 0,
    priceMax: 1000,
    isOnline: false
  }
};

export const courseFilterSlice = createSlice({
  name: 'courseFilter',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IFilter>) => {
      state.value = { ...state.value, ...action.payload };
    }
  }
});

export const { update } = courseFilterSlice.actions;

export default courseFilterSlice.reducer;
