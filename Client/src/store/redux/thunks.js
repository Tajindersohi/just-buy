import {createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutAdmin } from './adminAuthSlice';
import apiConstants from '../../api/Constants';
import { gettingUserInfo, gettingUserInfoFailed, loginOrSignup, sentLoginOtp, logoutClient } from './authSlice';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.admin.login(credentials);
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
      const { sent,message } = response.data;
      if(response.status == 200){
        dispatch(sentLoginOtp({sent:sent,message:message})); 
      }else{
      }
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
      if(response.status == 200){
        localStorage.clear();
        const { token, user} = response.data;
        localStorage.setItem('token', token);
        dispatch(loginOrSignup(user)); 
      }else{
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'failed');
    }
  }
);


export const logout = createAsyncThunk('admin/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token'); 
  dispatch(logoutAdmin());
});

export const logoutUser = createAsyncThunk('/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token'); 
  dispatch(logoutClient());
});

export const getMe = createAsyncThunk(
  '/getMe',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingUserInfo());
      const token = localStorage.getItem('token')
      if(token){
        // showLoading(true)
        const response = await apiConstants.user.getMe({token:token});
        if(response.status == 200){
          const {user} = response.data;
          localStorage.setItem('token', token);
          dispatch(loginOrSignup(user)); 
        }else{
          dispatch(gettingUserInfoFailed());
        }
        return response.data
      }
    }catch(error){
      return rejectWithValue(error.response?.data?.message || 'failed');
    }
  }
);
