import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const adminAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutAdmin(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginUser, logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
