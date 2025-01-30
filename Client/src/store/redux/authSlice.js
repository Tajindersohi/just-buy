import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  sent:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginOrSignup(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    sentLoginOtp(state,action){
      state.sent = action.payload
    }
  },
});

export const { loginOrSignup, sentLoginOtp } = authSlice.actions;
export default authSlice.reducer;
