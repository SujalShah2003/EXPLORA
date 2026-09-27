import { combineReducers } from '@reduxjs/toolkit';
import { cartSlice } from '@/store/app/cart.slice.ts';

export const appReducer = combineReducers({
  cart: cartSlice.reducer
});
