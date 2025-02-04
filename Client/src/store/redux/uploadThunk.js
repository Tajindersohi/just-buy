import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  uploadMedia,
  uploadMediaFailed,
  uploadingMedia
} from './uploadSlide';
import apiConstants from '../../api/Constants';
import { showError, showSuccess } from '../../Assets/Constants/showNotifier';

export const uploadImage = createAsyncThunk(
    '/upload-image',
    async (formData, { dispatch, rejectWithValue }) => {
      try {
        dispatch(uploadingMedia());
  
        const response = await apiConstants.upload.image(formData);
        console.log("Upload Response:", response.data);
  
        const { url, message, success } = response.data.data;
        if (success) {
          showSuccess(message);
          dispatch(uploadMedia({ url, message })); 
        } else {
          showError(message || 'Upload failed');
          dispatch(uploadMediaFailed(message || 'Upload failed'));
        }
  
        return { response };
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Upload failed';
        showError(errorMessage);
        dispatch(uploadMediaFailed(errorMessage));
  
        return rejectWithValue(errorMessage);
      }
    }
  );
  

