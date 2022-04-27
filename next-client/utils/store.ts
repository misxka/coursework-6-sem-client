import { configureStore } from '@reduxjs/toolkit';

import modeReducer from '../utils/slices/modeSlice';
import gameStartedReducer from '../utils/slices/gameStartedSlice';
import guessedReducer from '../utils/slices/guessedSlice';
import userReducer from '../utils/slices/userSlice';
import filterReducer from '../utils/slices/filterSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    gameStarted: gameStartedReducer,
    guessed: guessedReducer,
    user: userReducer,
    filter: filterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
