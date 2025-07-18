// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import adminAuthSlice from './adminAuthSlice';
import adminUsersSlice from './adminUsersSlice';
import categorySlice from './categorySlice';
import userSlice from './authSlice';
import productSlice from './productSlice';
import homeSlice from './homeSlice';
import cartSlice from './cartslice';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const rootReducer = combineReducers({
  auth: adminAuthSlice,
  adminUsers: adminUsersSlice,
  category: categorySlice,
  user: userSlice,
  product: productSlice,
  home: homeSlice,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export default store;
