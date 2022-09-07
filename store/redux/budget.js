import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  budget: 0,
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    budgetHandler: (state, action) => {
      state.budget = action.payload;
    },
  },
});
export const { budgetHandler } = budgetSlice.actions;
export default budgetSlice.reducer;
