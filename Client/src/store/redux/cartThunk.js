import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  gettingCart,
  getCartSuccess,
  getCartFailed,
  removeProduct,
  addProduct,
  syncCartSlice,
  clearCartSlice,
} from './cartslice';
import apiConstants from '../../api/Constants';

export const getCartDetails = createAsyncThunk(
  'cart/getCartDetails',
  async (data,{ dispatch, rejectWithValue, getState }) => {
    try {
      const { cart } = getState(); 
      dispatch(gettingCart());
      const response = await apiConstants.cart.getCart(cart.items);
      const list = response.data.data;

      if (response.data.success) {
        dispatch(getCartSuccess(list));
      }

      return list;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Get Products failed';
      dispatch(getCartFailed(errorMsg));
      return rejectWithValue(errorMsg);
    }
  }
);

export const removeCartProduct = createAsyncThunk(
  'cart/removeProduct',
  (id, { dispatch }) => {
    try {
      dispatch(removeProduct(id));
    } catch (err) {
      console.error("Remove Cart Product failed", err);
    }
  }
);

export const addCartProductItem = createAsyncThunk(
  'cart/addProduct',
  (data, { dispatch }) => {
    try {
      console.log("datadata",data);
      dispatch(addProduct(data));
    } catch (err) {
      console.error("Add Cart Product failed", err);
    }
  }
);


export const syncCart = createAsyncThunk(
  'cart/syncCart',
  (data, { dispatch }) => {
    try {
      dispatch(syncCartSlice(data));
    } catch (err) {
      console.error("Sync Cart failed", err);
    }
  }
);


export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch }) => {
    try {
      // ✅ Clear Redux cart
      dispatch(clearCartSlice());

      // ✅ Clear LocalStorage cart
      localStorage.removeItem("cart");

      // Optionally: also call backend to clear user cart in DB if needed
      // await apiConstants.cart.clearCartForUser(userId);
    } catch (err) {
      console.error("Clear Cart failed", err);
    }
  }
);
