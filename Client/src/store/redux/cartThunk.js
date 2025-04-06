import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    gettingCart,
    getCartSuccess,
    getCartFailed
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

