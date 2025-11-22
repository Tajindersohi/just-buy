import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  sent: false,
  isFetching: false,
  userLoaded: false,  
  message: "",
  cart: [],
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginOrSignup(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isFetching = false;
      state.userLoaded = true;   
    },
    sentLoginOtp(state, action) {
      state.sent = action.payload.sent;
      state.message = action.payload.message;
    },
    resetOtpSent(state) { 
      state.sent = false;
      state.message = "";
    },
    addToCart(state,action){
      state.cart = action.payload.cart
    },
    gettingUserInfo(state){
      state.isAuthenticated = false;
      state.user = null;
      state.isFetching = true;
    },
    gettingUserInfoFailed(state){
      state.isAuthenticated = false;
      state.user = null;
      state.userLoaded = true;   
      state.isFetching = false;
    },
    logoutClient(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginOrSignup, sentLoginOtp, resetOtpSent, addToCart, gettingUserInfoFailed, gettingUserInfo, logoutClient } = userSlice.actions;
export default userSlice.reducer;
