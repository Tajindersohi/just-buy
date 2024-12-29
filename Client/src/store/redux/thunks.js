import {createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { loginUser, logoutUser } from './reducers';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
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


export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  console.log("state");

  localStorage.removeItem('token'); // Remove token from localStorage
  dispatch(logoutUser()); // Update Redux state
});

