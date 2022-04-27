import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../../interfaces/IUser';

interface IFilter {
  login: string;
  fullname: string;
  email: string;
  role: string;
}

export interface FilterState {
  value: IFilter;
}

const initialState: FilterState = {
  value: {
    login: '',
    email: '',
    fullname: '',
    role: 'STUDENT'
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IFilter>) => {
      state.value = { ...state.value, ...action.payload };
    }
  }
});

export const { update } = filterSlice.actions;

export default filterSlice.reducer;
