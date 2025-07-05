import { createSlice } from '@reduxjs/toolkit';
import { getCartDetails } from './cartThunk';

const initialState = {
  items: [],
  isLoading: false,
  total_cost: 0,
  delivery_charges: 0,
  handeling_charges: 0,
  detailsFetched: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    gettingCart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getCartFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCartSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload.items;
      state.total_cost = action.payload.total_cost;
      state.delivery_charges = action.payload.delivery_charges;
      state.handeling_charges = action.payload.handeling_charges;
    },
    removeProduct(state, action) {
      state.items = state.items
        .map(item =>
          item._id === action.payload ? { ...item, count: item.count - 1 } : item
        )
        .filter(item => item.count > 0);
    },
    addProduct(state, action) {
      const existingItem = state.items.find(item => item._id === action.payload);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ _id: action.payload, count: 1 });
      }
    },
    syncCartSlice(state, action) {
      state.items = action.payload;
    },
    resetCartState(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartDetails.fulfilled, (state) => {
      state.detailsFetched = true;
    });
  },
});

export const {
  gettingCart,
  getCartFailed,
  getCartSuccess,
  removeProduct,
  addProduct,
  syncCartSlice,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
