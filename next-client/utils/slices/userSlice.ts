import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../../interfaces/IUser';

export interface UserState {
  value: IUser;
}

const initialState: UserState = {
  value: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IUser>) => {
      state.value = { ...action.payload };
    }
  }
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
