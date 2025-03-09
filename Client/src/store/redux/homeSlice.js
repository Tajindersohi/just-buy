import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    products: [],
    categories : [],
    isLoading: false,
    error: null,
  },
  reducers: {
    gettingHome: (state) => {
      state.isLoading = true;
    },
    gettingHomeFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getHomeSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.subCategory;
      state.categories = action.payload.category;
    }
  },
});

export const {
    gettingHome,
    getHomeSuccess,
    gettingHomeFailed
} = homeSlice.actions;

export default homeSlice.reducer;
