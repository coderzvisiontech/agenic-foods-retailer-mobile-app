import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Slice/productSlice';
import profileReducer from '../Slice/profileSlice';
import CartReducer from '../Slice/cartSlice';
import OrderReducer from '../Slice/orderSlice';

export const store = configureStore({
  reducer: {
    product: productReducer, //product list
    profile: profileReducer, //user profile
    cart: CartReducer, //cart list
    order: OrderReducer, //order list
  },
});
