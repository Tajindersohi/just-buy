import { createSlice } from '@reduxjs/toolkit';
import {
  createUser,
  updateUser,
  deleteUserById,
} from './adminUsersThunk'; // update path as needed

const initialState = {
  loading: false,
  list: [],
  error: null,
};

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    gettingList: (state) => {
      state.loading = true;
      state.error = null;
    },
    getListSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    getListFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // === Create User ===
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      const user = action.payload?.data;
      if (user) state.list.push(user);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Create user failed';
    });

    // === Update User ===
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload?.data;
      if (updatedUser) {
        const index = state.list.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) state.list[index] = updatedUser;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Update user failed';
    });

    // === Delete User ===
    builder.addCase(deleteUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.loading = false;
      const deletedUser = action.payload?.data;
      if (deletedUser) {
        state.list = state.list.filter((user) => user._id !== deletedUser._id);
      }
    });
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Delete user failed';
    });
  },
});

export const { gettingList, getListSuccess, getListFailed } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
