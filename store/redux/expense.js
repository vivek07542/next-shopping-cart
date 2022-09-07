import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenseItem: [],
  expense: '',
  amount: 0,
  editMode: false,
  editObject: {},
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    expenseHandler: (state, action) => {
      const { id, item, amount } = action.payload;
      console.log(action.payload);
      if (!state.editMode & (id === '')) {
        let generateId = null;
        if (state.expenseItem.length !== 0) {
          const lastIndexItem = state.expenseItem[state.expenseItem.length - 1];
          generateId = lastIndexItem.id + 1;
        } else {
          generateId = 1;
        }
        const newData = {
          id: generateId,
          item: item,
          amount: amount,
        };
        state.expenseItem = [...state.expenseItem, newData];
      } else {
        const itemIndex = state.expenseItem.findIndex((item) => item.id === id);
        const newValue = {
          id: id,
          item: item,
          amount: amount,
        };
        state.expenseItem[itemIndex] = newValue;
      }
      state.expense = '';
      state.amount = 0;
      state.editMode = false;
      state.editObject = {};
    },
    editHandlers: (state, action) => {
      state.editMode = true;
      state.editObject = {
        id: action.payload.id,
        expense: action.payload.item,
        amount: action.payload.amount,
      };
    },
    deleteHandlers: (state, action) => {
      const { id, item, amount } = action.payload;
      const updateValue = [...state.expenseItem];
      const itemIndex = state.expenseItem.findIndex((item) => item.id === id);
      updateValue.splice(itemIndex, 1);
      state.expenseItem = updateValue;
    },
  },
});
export const { expenseHandler, editHandlers, deleteHandlers } =
  expenseSlice.actions;
export default expenseSlice.reducer;
