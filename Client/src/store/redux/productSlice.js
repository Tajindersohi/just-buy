import { createSlice } from '@reduxjs/toolkit';
import { Products } from '../../Assets/Constants/ProductConstant';

const initialState = { ...Products, filter: false, filterBy: null };

const productSlice = createSlice({
  name: 'product',
  initialState, // Use the correct property name
  reducers: {
    getProducts(state, action) {
      state.filter = true;
      state.filterBy = action.payload;
    },
  },
});

export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
