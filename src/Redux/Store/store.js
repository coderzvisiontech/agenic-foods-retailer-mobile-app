import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Slice/productSlice';
import profileReducer from '../Slice/profileSlice';

export const store = configureStore({
  reducer: {
    product: productReducer, //product list
    profile: profileReducer, //user profile
  },
});
