import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading:false
};

const adminAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    logging(state,action) {
      state.loading = true;
    },
    logoutAdmin(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    loginUserFailed(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
});

export const { loginUser, logoutAdmin, logging, loginUserFailed } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
