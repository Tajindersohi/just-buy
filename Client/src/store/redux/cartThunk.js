import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  gettingCart,
  getCartSuccess,
  getCartFailed,
  removeProduct,
  addProduct,
  syncCartSlice,
} from './cartslice';
import apiConstants from '../../api/Constants';

export const getCartDetails = createAsyncThunk(
  'cart/getCartDetails',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingCart());
      const response = await apiConstants.cart.getCart(data);
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
  (id, { dispatch }) => {
    try {
      dispatch(addProduct(id));
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
