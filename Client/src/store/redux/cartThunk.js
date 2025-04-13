import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    gettingCart,
    getCartSuccess,
    getCartFailed,
    removeProduct,
    addProduct
} from './cartslice';
import apiConstants from '../../api/Constants';

export const getCartDetails = createAsyncThunk(
  '/cart',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingCart()); 
      const response = await apiConstants.cart.getCart(data);
      const list = response.data.data;
      if(response.data.success){
        dispatch(getCartSuccess(list)); 
      }
      return { list };
    } catch (err) {
      dispatch(getCartFailed(err.response?.data?.message || 'Get Products failed')); // Dispatch error
    }
  }
);

export const removeCartProduct = createAsyncThunk(
  '/cart',
  (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(removeProduct(id)); 
    } catch (err) {
    }
  }
);

export const addCartProductItem = createAsyncThunk(
  '/cart',
  (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(addProduct(id)); 
    } catch (err) {
    }
  }
);
