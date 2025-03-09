import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    gettingHome,
    getHomeSuccess,
    gettingHomeFailed
} from './homeSlice';
import apiConstants from '../../api/Constants';

export const getHomeDetails = createAsyncThunk(
  '/home',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingHome()); 
      const response = await apiConstants.home.getHome(data);
      const list = response.data.data;
      console.log("datadatadata",list);
      if(response.data.success){
        dispatch(getHomeSuccess(list)); 
      }
      return { list };
    } catch (err) {
      dispatch(gettingHomeFailed(err.response?.data?.message || 'Get Products failed')); // Dispatch error
      return rejectWithValue(err.response?.data?.message || 'Get Products failed');
    }
  }
);

