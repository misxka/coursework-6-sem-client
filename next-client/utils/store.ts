import { configureStore } from '@reduxjs/toolkit';

import modeReducer from '../utils/slices/modeSlice';
import gameStartedReducer from '../utils/slices/gameStartedSlice';
import guessedReducer from '../utils/slices/guessedSlice';

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    gameStarted: gameStartedReducer,
    guessed: guessedReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
