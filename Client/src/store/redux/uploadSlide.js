import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploaded: false,
  message:"",
  url:"",
  isuploading:false
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    uploadingMedia(state,action){
      state.isuploading = true  
    },
    uploadMedia(state, action) {
      state.uploaded = true;
      state.url= action.payload.url;
      state.isuploading = false  
      state. message = action.payload.message
    },
    uploadMediaFailed(state,action){
        state.isuploading = false 
        state. message = action.payload
    }
  },
});

export const { uploadMedia, uploadingMedia, uploadMediaFailed } = uploadSlice.actions;
export default uploadSlice.reducer;
