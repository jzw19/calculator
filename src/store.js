import { configureStore } from '@reduxjs/toolkit';
import inputPadReducer from './components/InputPad/InputPadSlice';

export const store = configureStore({
  reducer: {
    inputPad: inputPadReducer
  }
});
