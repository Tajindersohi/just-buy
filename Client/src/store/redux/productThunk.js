import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProducts,
  gettingProducts,
  gettingProductsFailed,
  addNewProduct
} from './productSlice';
import apiConstants from '../../api/Constants';
export const getProductsList = createAsyncThunk(
  '/product',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts()); 
      const response = await apiConstants.product.productList(data);
      console.log('response.data', response);
      const list = response.data;
      dispatch(getProducts(list)); 
      return { list };
    } catch (err) {
      dispatch(gettingProductsFailed(err.response?.data?.message || 'Get Products failed')); // Dispatch error
      return rejectWithValue(err.response?.data?.message || 'Get Products failed');
    }
  }
);

export const addProduct = createAsyncThunk(
  'product/add',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts()); // Show loading
      const response = await apiConstants.product.addProduct(data);
      dispatch(addNewProduct(response)); // Add product to the list
      return { response };
    } catch (error) {
      dispatch(gettingProductsFailed(error.response?.data?.message || 'Add Product failed')); // Dispatch error
      return rejectWithValue(error.response?.data?.message || 'Add Product failed');
    }
  }
);

