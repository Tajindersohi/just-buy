import {createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './authSlice';
import apiConstants from '../../api/Constants';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.adminLogin(credentials);
      console.log("response",response);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch(loginUser(user)); 
      return { token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const create = createAsyncThunk(
  'auth/register',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.registerUser(credentials);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registeration failed');
    }
  }
);


export const logout = createAsyncThunk('admin/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token'); 
  dispatch(logoutUser());
});

