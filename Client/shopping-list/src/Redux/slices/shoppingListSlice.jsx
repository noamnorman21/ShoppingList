import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { productName, category } = action.payload;
      const existingProductIndex = state.items.findIndex((item) => item.name === productName);

      if (existingProductIndex !== -1) {
        // Product already exists, increment quantity
        state.items[existingProductIndex].quantity += 1;
      } else {
        // Product doesn't exist, add to the list
        state.items.push({ id: Date.now(), name: productName, category, quantity: 1 });
      }
      state.totalItems += 1;
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.items.findIndex((item) => item.id === productId);

      if (productIndex !== -1) {
        state.totalItems -= state.items[productIndex].quantity;
        state.items.splice(productIndex, 1);
      }
    },
    editProduct: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productIndex = state.items.findIndex((item) => item.id === productId);

      if (productIndex !== -1) {
        // Subtract the current quantity from the totalItems
        state.totalItems -= state.items[productIndex].quantity;

        // Update the quantity of the product
        state.items[productIndex].quantity = newQuantity;
        // Add the new quantity to the totalItems
        state.totalItems += newQuantity;
      }
    },
    resetShoppingList: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { resetShoppingList } = shoppingListSlice.actions;
export const { actions, reducer } = shoppingListSlice;
export default shoppingListSlice;
