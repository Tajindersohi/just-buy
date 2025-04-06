import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    products: [],
    categories : [],
    isLoading: false,
    error: null,
  },
  reducers: {
    gettingProducts: (state) => {
      state.isLoading = true;
    },
    gettingProductsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProducts: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    addNewProduct: (state, action) => {
      // state.products.push(action.payload);
    },
    addNewCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export const {
  gettingProducts,
  gettingProductsFailed,
  getProducts,
  addNewProduct,
  addNewCategory
} = categorySlice.actions;

export default categorySlice.reducer;
