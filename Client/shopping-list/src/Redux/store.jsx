// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import shoppingListSlice from './slices/shoppingListSlice';

const store = configureStore({
  reducer: {
    shoppingList: shoppingListSlice.reducer,
  },
});

export default store;