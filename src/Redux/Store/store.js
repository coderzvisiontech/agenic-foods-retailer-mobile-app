// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';

// Dummy slice reducer
const dummyReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREMENT':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
});
