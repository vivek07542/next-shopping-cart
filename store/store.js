import { configureStore } from '@reduxjs/toolkit';
import budget from './redux/budget';
import expense from './redux/expense';
export const store = configureStore({
  reducer: {
    budget: budget,
    expense: expense,
  },
});
