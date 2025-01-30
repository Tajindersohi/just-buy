import {createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './adminAuthSlice';
import apiConstants from '../../api/Constants';
import { loginOrSignup, sentLoginOtp } from './authSlice';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.admin.login(credentials);
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
      const response = await apiConstants.admin.registerUser(credentials);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registeration failed');
    }
  }
);

export const sendOtp = createAsyncThunk(
  '/sent-otp',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.user.sentOtp(credentials);
      const { sent } = response.data;
      dispatch(sentLoginOtp(sent)); 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'failed');
    }
  }
);

export const loginWithOtp = createAsyncThunk(
  '/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.user.login(credentials);
      const { token, user} = response.data;
      localStorage.setItem('token', token);
      dispatch(loginOrSignup(user)); 
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'failed');
    }
  }
);


export const logout = createAsyncThunk('admin/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token'); 
  dispatch(logoutUser());
});


