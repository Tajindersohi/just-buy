import { createAsyncThunk } from '@reduxjs/toolkit';
import apiConstants from '../../api/Constants';
import { deleteProductSuccess, deletingProduct, deletingProductFailed, getProductsFailed, getProductsSuccess, gettingProducts, updateProduct } from './productSlice';

export const getProductsList = createAsyncThunk(
  'category/product',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts());
      const response = await apiConstants.product.getCategoryProducts(id);
      dispatch(getProductsSuccess(response.data)); 
      return { response };
    } catch (error) {
      dispatch(getProductsFailed(error.response?.data?.message || 'Add Product failed')); // Dispatch error
      return rejectWithValue(error.response?.data?.message || 'Add Product failed');
    }
  }
);

export const updateSingleProduct = createAsyncThunk(
  'product/update-product',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingProducts()); 
      const response = await apiConstants.product.updateProduct(data);
      dispatch(updateProduct(response.data.product));
      return { response };
    } catch (error) {
      dispatch(getProductsFailed(error.response?.data?.message || 'Update Product failed')); // Dispatch error
      return rejectWithValue(error.response?.data?.message || 'Update Product failed');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'category/product',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(deletingProduct());
      const response = await apiConstants.product.deleteProduct(id);
      dispatch(deleteProductSuccess(id)); 
      return { response };
    } catch (error) {
      dispatch(deletingProductFailed(error.response?.data?.message || 'Add Product failed')); // Dispatch error
      return rejectWithValue(error.response?.data?.message || 'Add Product failed');
    }
  }
);


