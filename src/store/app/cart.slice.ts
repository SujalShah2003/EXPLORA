import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type CartItem = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
};

export type ICartSlice = {
  items: CartItem[];
};

const initialState: ICartSlice = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    }
  }
});

export const { ADD_TO_CART } = cartSlice.actions;

// `cart` can be missing right after rehydrating state persisted before the cart existed (hardSet).
export const GET_CART_QUANTITY = (id: number) => (state: RootState) =>
  state.app.cart?.items.find(item => item.id === id)?.quantity ?? 0;

export const GET_CART_COUNT = (state: RootState) =>
  state.app.cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;
