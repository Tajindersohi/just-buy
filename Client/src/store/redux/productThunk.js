import { createAsyncThunk } from '@reduxjs/toolkit';
import apiConstants from '../../api/Constants';
import { showError, showSuccess } from '../../Assets/Constants/showNotifier';
import { getProductsFailed, getProductsSuccess, gettingProducts } from './productSlice';

export const getProductsList = createAsyncThunk(
  'category/product',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts());
      const response = await apiConstants.product.getCategoryProducts(id);
      dispatch(getProductsSuccess(response.data.list)); 
      showSuccess(response.data.message);
      return { response };
    } catch (error) {
      dispatch(getProductsFailed(error.response?.data?.message || 'Add Product failed')); // Dispatch error
      showError(error.response.data.message);
      return rejectWithValue(error.response?.data?.message || 'Add Product failed');
    }
  }
);


