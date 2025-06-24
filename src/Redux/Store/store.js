import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Slice/productSlice';
import profileReducer from '../Slice/profileSlice';
import CartReducer from '../Slice/cartSlice';

export const store = configureStore({
  reducer: {
    product: productReducer, //product list
    profile: profileReducer, //user profile
    cart: CartReducer, //cart list
  },
});
