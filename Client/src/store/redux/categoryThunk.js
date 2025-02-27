import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProducts,
  gettingProducts,
  gettingProductsFailed,
  addNewProduct,
  addNewCategory
} from './categorySlice';
import apiConstants from '../../api/Constants';
import { showError, showSuccess } from '../../Assets/Constants/showNotifier';

export const getCategoryList = createAsyncThunk(
  '/product',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts()); 
      const response = await apiConstants.product.categoryList(data);
      const list = response.data.data;
      if(response.data.success){
        showSuccess(response.data.message);
        dispatch(getProducts(list)); 
      }
      return { list };
    } catch (err) {
      dispatch(gettingProductsFailed(err.response?.data?.message || 'Get Products failed')); // Dispatch error
      return rejectWithValue(err.response?.data?.message || 'Get Products failed');
    }
  }
);

export const addProduct = createAsyncThunk(
  'product/create-product',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts()); // Show loading
      const response = await apiConstants.product.createProduct(data);
      dispatch(addNewProduct(response.data.product)); // Add product to the list
      showSuccess(response.data.message);
      return { response };
    } catch (error) {
      showError(error);
      dispatch(gettingProductsFailed(error.response?.data?.message || 'Add Product failed')); // Dispatch error
      return rejectWithValue(error.response?.data?.message || 'Add Product failed');
    }
  }
);

export const addCategory = createAsyncThunk(
  'product/create-caterory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts());
      const response = await apiConstants.product.createCategory(data);
      dispatch(addNewCategory(response.data.product)); 
      showSuccess(response.data.message);
      return { response };
    } catch (error) {
      dispatch(gettingProductsFailed(error.response?.data?.message || 'Add Product failed')); // Dispatch error
      return rejectWithValue(error.response?.data?.message || 'Add Product failed');
    }
  }
);

export const getProductsList = createAsyncThunk(
  'category/product',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts());
      const response = await apiConstants.product.getCategoryProducts(id);
      dispatch(addNewCategory(response.data.product)); 
      showSuccess(response.data.message);
      return { response };
    } catch (error) {
      dispatch(gettingProductsFailed(error.response?.data?.message || 'Add Product failed')); // Dispatch error
      return rejectWithValue(error.response?.data?.message || 'Add Product failed');
    }
  }
);



